const router = require('express').Router({ mergeParams: true })
const User = require('../models/user')
const { isLoggedIn, isSameUser } = require('../middleware/auth')

router.post('/', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 201

  try {
    const { userId } = req.params
    const query = { _id: userId }
    const user = await User.findOne(query)

    user.assignments.push(req.body)
    await user.save()

    const assignment = user.assignments[user.assignments.length - 1]
    res.status(status).json({ status, response: assignment })
  } catch (e) {
    console.error(e.errors)
    const error = new Error(`Can't create assignment`)
    error.status = 400
    next(error)
  }
})

router.put('/:assignmentId', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200

  try {
    const { assignmentId, userId } = req.params
    const query = { _id: userId }
    const user = await User.findOne(query)
    const assignment = user.assignments.id(assignmentId)

    const { title, link, description, grade } = req.body
    assignment.title = title
    assignment.link = link
    assignment.description = description
    assignment.grade = grade
    await user.save()

    res.status(status).json({ status, response: assignment })
  } catch (e) {
  console.error(e.errors)
  const error = new Error(`Can't edit assignment`)
  error.status = 400
  next(error)
  }
})

router.put('/:assignmentId/grade', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200

  try {
    const { assignmentId, userId } = req.params
    const query = { _id: userId }
    const user = await User.findOne(query)
    const assignment = user.assignments.id(assignmentId)

    const { grade, total } = req.body
    assignment.grade = grade
    assignment.total = total
    await user.save()

    res.status(status).json({ status, response: assignment })
  } catch (e) {
  console.error(e.errors)
  const error = new Error(`Unable to edit assignment`)
  error.status = 400
  next(error)
  }
})

router.delete('/:assignmentId', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200

  try {
    const { assignmentId, userId } = req.params
    const query = { _id: userId }
    const user = await User.findOne(query)

    user.assignments = user.assignments.filter(assignment => assignment.id !== assignmentId)
    await user.save()

    res.json({ status, response: user })
  } catch (e) {
  console.error(e.errors)
  const error = new Error(`Unable to edit assignment`)
  error.status = 400
  next(error)
  }
})

module.exports = router

// GET all assignments
router.get('/', async (req, res, next) => {
  const status = 200
  try {
    const users = await User.find().select('assignments')

    res.json({ status, users })
  } catch (error) {
    const e = new Error(error)
    e.status = 400
    next(e)
  }

})
