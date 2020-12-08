import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import MainMap from './MainMap'

import { addEvent } from '../actions/createEvent'

class CreateEvent extends React.Component {

  getTodaysDate = () => {
    let tzoffset = (new Date()).getTimezoneOffset() * 60000 //offset in milliseconds
    let localISODate = (new Date(Date.now() - tzoffset)).toISOString().split('T')[0]
    return localISODate
  }

  getTimeNow = () => {
    let tzoffset = (new Date()).getTimezoneOffset() * 60300 
    let localTime = (new Date(Date.now() - tzoffset)).toISOString().split('T')[1].slice(0,5)
    return localTime
  }

  state = {
    newEvent: {
      creator_id: this.props.activeUser.id,
      eventName: null,
      description: null,
      startPoint: [],
      endPoint: [],
      startTime: 1607464920,
      maxGroupSize: 8,
      distance: null
    },
    time: this.getTimeNow(),
    date: this.getTodaysDate(),
    redirect: false
  }

  handleChange = (event) => {
    this.setState({
      newEvent: {
        ...this.state.newEvent,
        [event.target.name]: event.target.value
      }
    })
  }

  handleTimeChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const str = this.state.date + ' ' + this.state.time + ' GMT+1300'
    const epoch = Math.floor(new Date(str) / 1000)
    const newEventObj = {
      ...this.state.newEvent,
      startPoint: '[' + this.props.createEvent.start + ']',
      endPoint: '[' + this.props.createEvent.finish + ']',
      startTime: epoch
    }
    this.setState({
      newEvent: {
        ...this.state.newEvent,
        startPoint: [this.props.createEvent.start],
        endPoint: [this.props.createEvent.finish],
        startTime: epoch
      }
    })
    if (!newEventObj.startPoint || !newEventObj.endPoint) {
      alert("Please Select start and end location")
    } else {
      this.props.dispatch(addEvent(newEventObj))
      this.setState({ redirect: true })
    }
  }

  render() {
    const redirect = this.state.redirect
    if (redirect) {
      return <Redirect to='/events' />
    }

    return (
      <>
        <MainMap />
        <div className='form-container'>
          <form className='event-form' action="submit" onSubmit={this.handleSubmit}>
            <input type="text" name='eventName' placeholder='Event name' onChange={this.handleChange} />

            <textarea id="" cols="30" rows="5" 
            name='description' 
            placeholder='A brief description of your event' 
            onChange={this.handleChange}></textarea><br />
            
            <label htmlFor="time" className='eventStartLabel'>Event time:</label><br />

            <input type="time"
              name='time'
              placeholder='time'
              defaultValue={this.getTimeNow()}
              onChange={this.handleTimeChange} />

            <input type="date"
              name='date'
              placeholder='date'
              min={this.getTodaysDate()}
              defaultValue={this.getTodaysDate()}
              onChange={this.handleTimeChange} />

            <div className="button" id="button-5">
              <div id="translate"></div>
              <button className='actual-button'>Submit</button>
            </div>

          </form>
        </div>
      </>
    )
  }
}

function mapStateToProps(globalState) {
  return {
    activeUser: globalState.activeUser,
    createEvent: globalState.createEvent
  }
}

export default connect(mapStateToProps)(CreateEvent)
