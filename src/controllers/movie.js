const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const sharp = require("sharp");
const Movie = require("../models/movie.js");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  maxAttempts: 3,
});

const addMovie = async (req, res) => {
  if (req.body === undefined){
    return res.status(400).send({
      "code": 0,
      "status": "Error",
      "message": "Please provide all the details"
    })
  }
  const { movie_name, release_year, cast, duration, languages, genres, description, star } = req.body;
  if ( !movie_name || !release_year || !cast || !duration || !languages || !genres || !description ){
    return res.status(400).send({
      "code": 0,
      "status": "Error",
      "message": "Please provide all the details"
    })
  }
    
  try {
    const new_movie = new Movie({
      movie_name,
      release_year,
      cast,
      duration,
      languages,
      genres,
      description,
      star
    });
    await new_movie.save();
    res
      .status(201)
      .send({ message: "Movie added successfully", movie: new_movie });
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).send.send({
      "code": 0,
      "status": "Failure",
      "message": "Internal Server Error"
    })
  }
};

const uploadPoster = async (req, res) => {

  // Extract poster file and JSON data from the request
  const buffer = await sharp(req.file.buffer).png().toBuffer();
  const bucketName = process.env.AWS_POSTER_BUCKET_NAME;
  const jsonData = JSON.parse(req.body.data);

  if(buffer==null || buffer==undefined || buffer=="" || bucketName==null || bucketName==undefined || bucketName=="" || jsonData==null || jsonData==undefined || jsonData==""){
    return res.status(400).send({
      "code": 0,
      "status": "Error",
      "message": "No data provided"
    })
  }

  try {
    // Find the movie based on the provided information
    const movie = await Movie.findOne({
      movie_name: jsonData.movie_name,
      release_year: jsonData.release_year,
    });

    if (!movie) return res.status(400).send("Movie not found");

    // Use the movie _id as the filename
    const filename = movie._id.toString() + ".png";

    // Upload the poster file to AWS S3
    await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: filename,
        Body: buffer,
        ACL: "public-read",
        ContentType: "image/png",
      })
    );

    res.status(200).send({
      "code": 1,
      "status": "Success",
      "message": "Poster uploaded successfully"
    })

  } catch (error) {
    console.error("Error uploading poster:", error);
    res.status(500).send.send({
      "code": 0,
      "status": "Failure",
      "message": "Internal Server Error"
    })
  }
};

const uploadVideo = async (req, res) => {
  const buffer = req.file.buffer; // Assuming the video buffer is not processed with sharp
  const bucketName = process.env.AWS_VIDEO_BUCKET_NAME;
  const jsonData = JSON.parse(req.body.data);

  if(buffer==null || buffer==undefined || buffer=="" || bucketName==null || bucketName==undefined || bucketName=="" || jsonData==null || jsonData==undefined || jsonData==""){
    return res.status(400).send({
      "code": 0,
      "status": "Error",
      "message": "No data provided"
    })
  }
  
  try {
    // Find the movie based on the provided information
    const movie = await Movie.findOne({
      movie_name: jsonData.movie_name,
      release_year: jsonData.release_year,
    });

    if (!movie) return res.status(400).send("Movie not found");

    const filename = movie._id.toString() + ".mp4"; // Change the extension as needed

    // Upload the video file to AWS S3
    await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: filename,
        Body: buffer,
        ACL: "public-read",
        ContentType: "video/mp4",
      })
    );

    res.status(200).send({
      "code": 1,
      "status": "Success",
      "message": "Video uploaded successfully"
    })

  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).send.send({
      "code": 0,
      "status": "Failure",
      "message": "Internal Server Error"
    })
  }
};

module.exports = { uploadPoster, uploadVideo, addMovie };
