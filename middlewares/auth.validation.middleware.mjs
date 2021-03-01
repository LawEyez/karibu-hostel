import jwt from 'jsonwebtoken'
import _ from 'dotenv'
import { isEmpty } from '../helpers/global.helper.mjs'

_.config()

export const ensureAuthenticated = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization')

        if (!authHeader) {
            return res.status(401).json({ msg: 'Unauthorized action! Please log in to continue.' })
        }

        const authInfo = authHeader.split(' ')

        if (authInfo[0] !== 'Bearer' || isEmpty(authInfo[1])) {
            return res.status(401).json({ msg: 'Invalid authorization details!' })
        }

        req.user = jwt.verify(authInfo[1], process.env.JWT_SECRET)
        next()

    } catch (err) {
        res.status(500).json(err)
    }
}