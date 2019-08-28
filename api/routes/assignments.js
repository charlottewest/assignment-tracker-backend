const router = require('express').Router({ mergeParams: true })
const User = require('../models/user')
const { isLoggedIn, isSameUser } = require('../middleware/auth')

router.post('/', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 201

  const { userId } = req.params
  const query = { _id: userId }
  const user = await User.findOne(query)

  user.assignments.push(req.body)
  await user.save()

  const assignment = user.assignments[user.assignments.length - 1]
  res.status(status).json({ status, response: assignment })
})

router.put('/:assignmentId', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200

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
})

router.delete('/:assignmentId', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200

  const { assignmentId, userId } = req.params
  const query = { _id: userId }
  const user = await User.findOne(query)

  user.assignments = user.assignments.filter(assignment => assignment.id !== assignmentId)
  await user.save()

  res.json({ status, response: user })
})

module.exports = router

// GET all assignments
router.get('/', async (req, res, next) => {
  const status = 200
  try {
    const users = await User.find().select('assignments')
    console.log(users)
    // let companies
    // if (req.query.name) {
    //   companies = units.filter(unit =>
    //     unit.company.name.toLowerCase().includes(req.query.name.toLowerCase())
    //   )
    // } else if (req.query.employees_lte) {
    //   companies = units.filter(unit =>
    //     unit.company.employees.length <= parseInt(req.query.employees_lte)
    //   )
    // } else if (req.query.employees_gte) {
    //   companies = units.filter(unit =>
    //     unit.company.employees.length >= parseInt(req.query.employees_gte)
    //   )
    // } else {
    //   companies = units
    // }

    res.json({ status, users })
  } catch (error) {
    const e = new Error(error)
    e.status = 400
    next(e)
  }

})
