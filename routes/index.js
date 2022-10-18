const express = require("express")
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const celebrityRoutes= require ("./celebrities.routes.js")
router.use("/celebrities", celebrityRoutes )

const movieRoutes = require ("./movies.routes.js")
router.use("/movies", movieRoutes)

module.exports = router;
