const express = require('express')
const router = express.Router()
const db = require('../db/db')

router.get('/', (req, res) => {
  return db.getUsers()
    .then(users => res.json(users))
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Somthing went wrong' })
    })
})

router.post('/', (req, res) => {
  return db.addUser(req.body)
    .then(ids => res.json(ids[0]))
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Somthing went wrong' })
    })
})

router.patch('/:id', (req, res) => {
  return db.editUser(req.params.id, req.body)
  .then(() => res.json({}))
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: 'Somthing went wrong' })
  })
})

module.exports = router