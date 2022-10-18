const express = require("express");
const Celebrity = require("../models/Celebrity.model.js");
const router = express.Router();
const Movie = require("../models/Movies.model.js");

//create
router.get("/create", async (req, res, next) => {
  try {
    const celebritiesList = await Celebrity.find();
    res.render("movies/new-movies.hbs", {
      celebritiesList,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  try {
    await Movie.create({
      title,
      genre,
      plot,
      cast,
    });
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const response = await Movie.find();
    res.render("movies/movies.hbs", {
      movieList: response,
    });
  } catch (error) {
    next(error);
  }
});
//read
router.get("/:id", async (req, res, next) => {
  let { id } = req.params;
  try {
    const details = await Movie.findById(id).populate("cast");
    res.render("movies/movie-details.hbs", {
      details,
    });
  } catch (error) {
    next(error);
  }
});

//delete
router.post("/:id/delete", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Movie.findByIdAndDelete(id);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

//update
router.get("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  try {
    const celebritiesDetails = await Celebrity.find();
    const details = await Movie.findById(id);
    res.render("movies/edit-movie.hbs", {
      details,
      celebritiesDetails,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const { title, genre, plot, cast } = req.body;
  const movieUpdate = {
    title,
    genre,
    plot,
    cast,
  };
  try {
    const movieEdit = await Movie.findByIdAndUpdate(id, movieUpdate);
    res.redirect(`/movies/${id}`);
  } catch (error) {
    next(error);
  }
});

/*router.post("/:movieId/edit", (req,res,next) => {
    const {movieId} = req.params
    const {title, genre, plot, cast} = req.body
 

    Movie.findByIdAndUpdate(movieId, {
        title,
        genre,
        plot,
        cast
    })
    .then((response) => {
        res.redirect(`/movies/${response.movieId}`)
    })
    .catch((error) => {
        next(error)
    })
})
*/
module.exports = router;
