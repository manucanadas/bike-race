import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


function UserById(props) {

  let thisUser = props.users.find(user => user.id == props.match.params.id)
  let attendingEvents = props.events.filter(event => event.attendees.includes(parseInt(props.match.params.id)))
  const currentTime = Date.now() / 1000

  return (
    <>
      <div>
        <h1 className='profilePageHeader'>Profile</h1>
        <div className='profileImageContainer'>
          <img src={thisUser.imgURL} className='profilePicture' />
        </div>
      </div>

      <div className='infoBorder'>
        <div className='userInfoPP'>
          <h3>Username: {thisUser.username}</h3>
          <h3>Email: {thisUser.email}</h3>
          <h3>Bike type: {thisUser.bikeType}</h3>
        </div>

        <div className='upcomingEventsContainer'>
          <h3>Upcoming events</h3>
          {attendingEvents.map(event => {
            if (event.startTime > currentTime) {
              return (
                <>
                  <ul key={event.id} >
                    <Link to={`/events/${event.id}`} className='upcomingEventsLink'>
                      <li className='upcomingEventsList'>{event.eventName}</li>
                    </Link>
                  </ul>
                </>
              )
            }
          })}
        </div>

        <div className='upcomingEventsContainer'>
          <h3>Past events</h3>
          {attendingEvents.map(event => {
            if (event.startTime < currentTime) {
              return (
                <>
                  <ul key={event.id} >
                    <Link to={`/events/${event.id}`} className='upcomingEventsLink'>
                      <li className='upcomingEventsList'>{event.eventName}</li>
                    </Link>
                  </ul>
                </>
              )
            }
          })}
        </div>
      </div>
    </>
  )
}

function ms2p(globalState) {
  return {
    users: globalState.users,
    events: globalState.events
  }
}

export default connect(ms2p)(UserById)