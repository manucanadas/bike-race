const express = require('express')
const router = express.Router()
const db = require('../db/db')

//GET ALL EVENTS (on page load)

router.get('/', (req, res) => {
  let events
  return db.getEvents()
    .then(results => {
      events = results
      return events
    })
    .then(() => db.getComments())
    .then(comments => {
      events.forEach(event => {
      event.comments = comments.filter(comment => comment.event_id === event.id)
      })
      return events
    })
    .then(() => db.getAttendees())
    .then(arr => {
      events.forEach(event => {
        const attendeesArr = arr.filter(id => id.event_id === event.id)
        event.attendees = attendeesArr.map(item => item.user_id)
      })
      return events
    })
    .then(() => res.json(events))
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Somthing went wrong' })
    })
})

// ADD NEW EVENT

router.post('/new', (req, res) => {
  const newEvent = req.body
  return db.addEvent(newEvent)
    .then(ids => res.json(ids[0]))
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

//add new comment to event
router.post('/addcomment', (req, res) => {
  return db.addComment(req.body)
    .then(ids => res.json(ids[0]))
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Somthing went wrong' })
    })
})

//add user to current race
router.post ('/addtoevent', (req,res) =>{
    return db.addUserToEvent(req.body)
    .then(()=> {
      res.json({})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Somthing went wrong' })
    })
})

//Removes User from Event if they click button
router.delete ('/removefromevent', (req,res) =>{
    return db.removeUserFromEvent(req.body)
    .then(()=> {
      res.json({})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Somthing went wrong' })
    })
})


module.exports = router
