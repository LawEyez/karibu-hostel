import validator from 'validator'
import { isEmpty } from '../helpers/global.helper.mjs'

export default data => {
    const errors = {}

    const name = !isEmpty(data.name) ? data.name : ''
    const location = !isEmpty(data.location) ? data.location : ''
    const price = !isEmpty(data.price) ? data.price : ''
    const description = !isEmpty(data.description) ? data.description : ''
    const category = !isEmpty(data.category) ? data.category : ''
    const county = !isEmpty(data.county) ? data.county : ''

    if (validator.isEmpty(name)) {
        errors.name = 'Property Name is required!'
    }

    if (validator.isEmpty(location)) {
        errors.location = 'Location is required!'
    }

    if (!validator.isInt(price, { min: 100 })) {
        errors.price = 'Price cannot be less than 100!'
    }

    if (validator.isEmpty(price)) {
        errors.price = 'Price is required!'
    }

    if (validator.isEmpty(description)) {
        errors.description = 'Description is required!'
    }
    
    if (validator.isEmpty(category)) {
        errors.category = 'Category is required!'
    }
    
    if (validator.isEmpty(county)) {
        errors.county = 'County is required!'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}