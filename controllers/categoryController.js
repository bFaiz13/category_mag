const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const category = new Category({ name, parent });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        const buildTree = (parentId = null) => {
            return categories
                .filter(cat => String(cat.parent) === String(parentId))
                .map(cat => ({
                    _id: cat._id,
                    name: cat.name,
                    parent: cat.parent,
                    status: cat.status,
                    children: buildTree(cat._id)
                }));
        };

        const tree = buildTree();
        res.status(200).json(tree);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.name = name || category.name;
        const prevStatus = category.status;
        category.status = status !== undefined ? status : category.status;
        await category.save();

        if ((prevStatus !== 'inactive' && status === 'inactive') || (prevStatus !== 'active' && status === 'active')) {
            const updateSubcategories = async (parentId, newStatus) => {
                const children = await Category.find({ parent: parentId });
                for (const child of children) {
                    child.status = newStatus;
                    await child.save();
                    await updateSubcategories(child._id, newStatus);
                }
            };
            await updateSubcategories(category._id, status);
        }

        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        
        // Reassign child categories to the parent category
        await Category.updateMany({ parent: id }, { parent: category.parent });
        
        // Delete the category
        await Category.findByIdAndDelete(id);
        res.status(200).json({ message: 'Category deleted successfully and subcategories reassigned' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
