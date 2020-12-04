const connection = require('./connection')

function getEvents (db = connection) {
  return db('events').select()
}

function getComments (db = connection) {
  return db('comments').select()
}

function getAttendees (db = connection) {
  return db('users_events').select()
}

function getUsers (db = connection) {
  return db('users').select()
}

function addEvent (newEvent, db = connection) {
  return db('events').insert(newEvent)
}

function addUser (user, db = connection) {
  return db('users').insert(user)
}

function editUser (id, user, db = connection) {
  return db('users').update(user).where('id', id)
}

function addComment (comment, db = connection) {
  return db('comments').insert(comment)
}

module.exports = {
  getEvents,
  getComments,
  getAttendees,
  getUsers,
  addEvent,
  addUser,
  addComment,
  editUser,
}
