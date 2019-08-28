const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('../nodemon.json')
const User = require('../api/models/user')

const reset = async () => {
  mongoose.connect(config.env.MONGO_DB_CONNECTION, { useNewUrlParser: true })
  // Careful with .remove() -- it sends a command directly to the database
  // and skips any mongoose validations
  await User.deleteMany() // Deletes all records
  return User.create([
    {
      firstname: 'Student',
      lastname: 'User',
      email: 'student.user@test.com',
      password: bcrypt.hashSync('password', 10),
      admin: false,
      posts: [
        {
          title: 'title 1',
          link: 'https://www.google.com',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tincidunt tellus, vel vehicula turpis euismod a. Nulla lobortis mi nec sagittis hendrerit. Sed ultrices metus ut eros interdum, vel blandit mi lacinia.',
          grade: '50'
        }
      ]
    },
    {
      firstname: 'Admin',
      lastname: 'User',
      email: 'admin.user@test.com',
      password: bcrypt.hashSync('password', 10),
      admin: true,
      posts: [
        {
          title: 'title 1',
          link: 'https://www.google.com',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tincidunt tellus, vel vehicula turpis euismod a. Nulla lobortis mi nec sagittis hendrerit. Sed ultrices metus ut eros interdum, vel blandit mi lacinia.',
          grade: ''
        }
      ]
    }
  ])
}

reset().catch(console.error).then((response) => {
  console.log(`Seeds successful! ${response.length} records created.`)
  return mongoose.disconnect()
})
