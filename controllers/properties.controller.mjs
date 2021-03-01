
import Property from '../models/properties.model.mjs'
import Category from '../models/categories.model.mjs'
import AddPropertyValidator from '../validators/add.property.validator.mjs'


export const addProperty = async (req, res) => {
    try {
        const { errors, isValid } = AddPropertyValidator(req.body)

        if (!isValid) return res.status(400).json(errors)
        
        const category = await Category.findById(req.body.category)

        if (!category) return res.status(400).json({ msg: 'Category chosen does not exist!' })

        const newProperty = new Property(req.body)
        const savedProperty = await newProperty.save()

        savedProperty ? res.status(201).json({ msg: 'Property added successfully!', property: savedProperty._doc }) : res.status(400).json({ msg: 'Failed to add new property!' })
    
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate('category', ['name'])
        res.status(200).json(properties)

    } catch (err) {
        res.status(500).json(err)
    }
}

export const getById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.propertyId).populate('category', ['name'])
        property ? res.status(200).json(property) : res.status(404).json({ msg: 'Property not found!' })

    } catch (err) {
        res.status(500).json(err)
    }
}

export const patchById = async (req, res) => {
    try {
        const { errors, isValid } = AddPropertyValidator(req.body)

        if (!isValid) return res.status(400).json(errors)

        const result = await Property.findOneAndUpdate({ _id: req.params.propertyId }, req.body)
        result ? res.status(200).json({ msg: 'Property updated successfully!', result }) : res.status(400).json({ msg: 'Failed to update property! It may not exist.' })

    } catch (err) {
        res.status(500).json(err)
    }
}

export const removeProperty = async (req, res) => {
    try {
        const result = await Property.findByIdAndDelete(req.params.propertyId)
        result ? res.status(200).json({ msg: 'Property deleted successfully!', result }) : res.status(400).json({ msg: 'Failed to delete property! It may not exist.'})

    } catch (err) {
        res.status(500).json(err)
    }
}