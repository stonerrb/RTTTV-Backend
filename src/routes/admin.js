const express = require("express");
const { checkPoster, checkVideo } = require("../middleware/check.js");
const { uploadPoster, uploadVideo } = require("../controllers/movie.js");
const {addMovie} = require("../controllers/movie.js");

const router = new express.Router();

router.post("/admin/add", addMovie);  
router.post(
  "/admin/uploadPoster",
  checkPoster.single("image"),
  uploadPoster,
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
router.post(
  "/admin/uploadVideo",
  checkVideo.single("video"),
  uploadVideo,
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
