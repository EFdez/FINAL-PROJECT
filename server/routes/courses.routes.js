const express = require("express")
const router = express.Router()

const Course = require("../models/Course.model")
const checkRole = rolesToCheck => (req, res, next) => rolesToCheck.includes(req.user.type) ? next() : res.json ({message: "Area Restringida!"})

//  ALL
// checkRole(['DIRECTOR'])

router.get("/", (req, res, next) => {
  Course.find().sort({ title: 1 })
    .populate('subjects')
    .then((response) => res.json(response))
    .catch((err) => next(err))
})

// COURSE-SUBJECTS
// checkRole(['ALL'])

router.get("/:id/subjects", (req, res, next) => {
  Course
    .findById(req.params.id)
    .populate('subjects')
    .then((response) => res.json(response))
    .catch((err) => next(err))
})

// STUDENT-COURSE
// checkRole(['DIRECTOR', 'TEACHER']),

router.get("/:id/users", (req, res, next) => {
  Course
    .findById(req.params.id)
    .populate('users')
    .then((response) => res.json(response))
    .catch((err) => next(err))
})

// CREATE
// checkRole(['DIRECTOR'])

router.post("/", (req, res, next) => {

const {title, subjects, user} = req.body

  Course.create({title, subjects, user})

    .then((response) => res.json(response), req.body)
    .catch((err) => next(err))
})

// UPDATE
// checkRole(['DIRECTOR'])

router.put("/:id", (req, res, next) => {
  const { title, subjects, users } = req.body

  Course.findByIdAndUpdate(
    req.params.id,
    { title, subjects, users },
    { new: true }
  )
    .then((response) => res.json(response))
    .catch((err) => next(err))
})

//DELETE
// checkRole(['DIRECTOR'])

router.delete("/:id",  (req, res, next) => {

  Course.findByIdAndRemove(req.params.id)
    .then((response) => res.json(response)) 
    .catch((err) => next(err))
})

module.exports = router
