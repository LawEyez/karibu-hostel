import jwt from 'jsonwebtoken'
import _ from 'dotenv'
import User from '../models/users.model.mjs'
import LoginValidator from '../validators/login.validator.mjs'
import { hash } from '../helpers/global.helper.mjs'

_.config()

export const login = async (req, res, next) => {
    try {
        const { errors, isValid } = LoginValidator(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(400).json({ msg: 'Email is not registered!' })
        }

        const passwordInfo = user.password.split('$')

        // Check if passwords match
        const providedPassword = hash(passwordInfo[0], req.body.password).split('$')[1]
        
        if (passwordInfo[1] !== providedPassword) {
            return res.status(400).json({ msg: 'Wrong email or password! Please try again.' })
        }

        // Create token
        const token = jwt.sign({
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            permissionLevel: user.permissionLevel

        }, process.env.JWT_SECRET, { expiresIn: '1h' })
        
        res.status(200).json({ msg: 'Login successful!', token })

    } catch (err) {
        res.status(500).json(err)
    }
}