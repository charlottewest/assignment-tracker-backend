const router = require('express').Router({ mergeParams: true })
const User = require('../models/user')
const { isLoggedIn, isSameUser } = require('../middleware/auth')

router.post('/', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 201

  const { userId } = req.params
  const query = { _id: userId }
  const user = await User.findOne(query)

  user.posts.push(req.body)
  await user.save()

  const post = user.posts[user.posts.length - 1]
  res.status(status).json({ status, response: post })
})

router.put('/:postId', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200

  const { postId, userId } = req.params
  const query = { _id: userId }
  const user = await User.findOne(query)
  const post = user.posts.id(postId)

  const { title, link, description, grade } = req.body
  post.title = title
  post.link = link
  post.description = description
  post.grade = grade
  await user.save()

  res.status(status).json({ status, response: post })
})

router.delete('/:postId', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200

  const { postId, userId } = req.params
  const query = { _id: userId }
  const user = await User.findOne(query)

  user.posts = user.posts.filter(post => post.id !== postId)
  await user.save()

  res.json({ status, response: user })
})

module.exports = router

// GET all posts
router.get('/', async (req, res, next) => {
  const status = 200
  try {
    const users = await User.find().select('posts')
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
