import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PropertySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    location: {
        type: String,
        required: true
    },

    county: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 100
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
    },

    poster: {
        type: String
    },

    images: [{
        type: String
    }],

    size: {
        type: Number
    },

    beds: {
        type: Number
    },
    
    baths: {
        type: Number
    },

    dateCreated: {
        type: Date,
        default: Date.now
    }
})

const Property = mongoose.model('Properties', PropertySchema)

export default Property