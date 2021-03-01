import validator from 'validator'
import { isEmpty } from '../helpers/global.helper.mjs'

export default data => {
    const errors = {}

    const name = !isEmpty(data.name) ? data.name : ''

    if (validator.isEmpty(name)) {
        errors.name = 'Category Name is required!'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}