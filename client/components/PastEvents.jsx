import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class PastEvents extends React.Component {

  render() {
    return (
      <>
        <h1 className='pastEventsHeader'>Past Events</h1>
        <ul>
          {this.props.events.map(event => {
            //declears new date varible for current time/date

            // converts it into epoch time
            let currentTime = Date.now() / 1000

            // converts epoch race time to date/time string then slice out what we need to display
            let raceFullDate = String(new Date(event.startTime * 1000))
            let raceDate = raceFullDate.slice(0, 15)
            let raceTime = raceFullDate.slice(16, 21)
            if (currentTime > event.startTime) {
              return (
                <div key={event.id} className='event-cards'>
                  <li className='event--li'>
                    <Link to={`events/${event.id}`}>
                      <h2>{event.eventName}</h2></Link>
                    <h4>{`Date ${raceDate}`}</h4>
                    <h4>{`Time ${raceTime}`}</h4>
                  </li>
                </div>
              )
            }
          })}
        </ul>
      </>
    )
  }
}

function mapStateToProps(globalState) {
  return {
    events: globalState.events,
    activeUser: globalState.activeUser
  }
}

export default connect(mapStateToProps)(PastEvents)








