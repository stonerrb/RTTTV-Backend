const Movie = new require("../models/movie");

const homepage = async (req, res) => {};

const getMovie = async (req, res) => {
  const _id = req.params.id;
  
  try {
    const movie = await Movie.findById(_id);
    if (!movie) {
      return res.status(404).send("Send Valid Id");
    }

    res.status(200).send(movie);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { homepage, getMovie };
