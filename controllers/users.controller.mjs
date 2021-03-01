import User from '../models/users.model.mjs'
import RegisterValidator from '../validators/register.validator.mjs'
import { hash, clean } from '../helpers/global.helper.mjs'

export const createUser = async (req, res) => {
    try {
        const { errors, isValid } = RegisterValidator(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        // Check if user exists
        const existing = await User.findOne({ email: req.body.email })

        if (existing) {
            return res.status(400).json({ msg: 'Email is already registered!' })
        }

        // Hash password
        req.body.password = hash(null, req.body.password)
        req.body.permissionLevel ? req.body.permissionLevel = 1 : null

        const newUser = new User(req.body)
        const savedUser = await newUser.save()
        const user = clean(savedUser._doc)

        savedUser ? res.status(201).json({ msg: 'Registration successful!', user }) : res.status(400).json({ msg: 'Registration failed!' })

    } catch (err) {
        res.status(500).json(err)
    }
}

export const getUsers = async (req, res) => {
    try {
        const dirtyUsers = await User.find()
        const users = dirtyUsers.map(user => clean(user._doc))
        res.status(200).json(users)

    } catch (err) {
        res.status(500).json(err)
    }
}

/*
export const createUser = async (req, res) => {
    try {
        
    } catch (err) {
        res.status(500).json(err)
    }
}

export const createUser = async (req, res) => {
    try {
        
    } catch (err) {
        res.status(500).json(err)
    }
}*/