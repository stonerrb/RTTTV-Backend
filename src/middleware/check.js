const multer = require('multer')

const storage = multer.memoryStorage()

const checkPoster = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})

const checkVideo = multer({
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(mkv|mp4)$/)) {
            return cb(new Error('Please upload a video'))
        }
        cb(undefined, true)
    }
})

module.exports = {checkPoster, checkVideo}