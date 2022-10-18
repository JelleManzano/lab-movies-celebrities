const express = require("express")
const router = express.Router()
const Celebrity = require("../models/Celebrity.model.js")
const Movie = require("../models/Movies.model.js")

router.get("/create", (req,res, next) => {
       res.render("celebrities/new-celebrity.hbs")
})

router.post("/create", async (req,res,next) => {
    const {name, occupation, catchPhrase} = req.body;

    try {
        await Celebrity.create({
            name,
            occupation,
            catchPhrase
        })
        res.redirect("/celebrities")
        
    } catch (error) {
        next(error)
        res.redirect("/celebrities/new-celebrity")
    }
})

router.get("/", async (req,res,next) =>{
    try {
        const celebritiesList = await Celebrity.find()
        res.render("celebrities/celebrities.hbs", {
            celebritiesList
        })
    } catch (error) {
        next(error) 
    }
})

module.exports = router