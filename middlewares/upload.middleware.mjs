import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-')
        cb(null, Date.now() + '-' + fileName)
    }
})

const upload = multer({ storage })

export const fileUpload = (req, res, next) => {
    try {
        if (req.file && req.file.filename) {
            const filename = req.file.filename
            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`

            upload.single('poster')

            req.body.poster = basePath + filename
        }

        next()
        
    } catch (err) {
        next(err)
    }
}
