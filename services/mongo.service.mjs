import mongoose from 'mongoose'
import _ from 'dotenv'

_.config()

const options = {
    poolSize: 10,
    bufferMaxEntries: 0,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, options)
        console.log('MongoDB connected...')
        
    } catch (error) {
        console.log('MongoDB failed to connect. Retrying in 5 seconds...')
        setTimeout(connectToDatabase, 5000)
    }
}