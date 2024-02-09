const Movie = new require("../models/movie");

const homepage = async (req, res) => {};

const getMovie = async (req, res) => {
  const _id = req.params.id;
  const link = "https://rttv-movies.s3.amazonaws.com/" + _id + ".mp4";
  try {
    const movie = await Movie.findById(_id);
    if (!movie) {
      return res.status(404).send("Send Valid Id");
    }

    const movieFill = {
      ...movie.toObject(),
      link: link
    };   
     
    res.status(200).send(movieFill);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { homepage, getMovie };
