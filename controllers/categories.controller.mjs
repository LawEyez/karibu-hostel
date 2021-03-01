import Category from '../models/categories.model.mjs'
import AddCategoryValidator from '../validators/add.category.validator.mjs'

export const addCategory = async (req, res) => {
    try {
        const { errors, isValid } = AddCategoryValidator(req.body)

        if (!isValid) return res.status(400).json(errors)

        const category = await Category.findOne({ name: req.body.name })

        if (category) return res.status(400).json({ msg: 'Category already exists!' })

        req.body.name = req.body.name.toLowerCase()

        const newCategory = new Category(req.body)
        const savedCategory = await newCategory.save()

        savedCategory ? (
            res.status(201).json({ msg: 'Category added successfully!', category: savedCategory._doc })
        ) : (
            res.status(400).json({ msg: 'Failed to add new category!' })
        )

    } catch (err) {
        res.status(500).json(err)
    }
}

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)

    } catch (err) {
        res.status(500).json(err)
    }
}

export const removeCategory = async (req, res) => {
    try {
        const result = await Category.findOneAndDelete({ _id: req.params.categoryId })
        result ? (
            res.status(200).json({ msg: 'Category deleted successfully!', result })
        ) : (
            res.status(400).json({ msg: 'Failed to delete category! It may not exist.' })
        )
    } catch (err) {
        
    }
}