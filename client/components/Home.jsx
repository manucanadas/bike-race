import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'


export class Home extends React.Component {
  render() {
    const reactPlayerStyle = {
      backgroundImage: 'url(/bikeImageLoad.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
    }
    // {this.props.activeUser}
    // const showHome = () => {
    //   return false
      // if no one logged in - true
      //and if not on register or login
      // if logged in and is exact - true
    // }

    return (
      <div>
        <div className="homeVideo">
          <ReactPlayer
            url="Videos/shortcliptest.mp4"
            className="reactPlayer"
            muted={true}
            playing={true}
            loop={true}
            controls={false}
            poster="Videos/bikeImageLoad.jpg"
            style={ reactPlayerStyle }
            height="100vh"
            width="100vw"
          />
          
          <div className="video-overlay">
            <div className="homeInfo">
              <p name="text" id="home-info">
                Find, create and share riding events in your area!
              </p>

              <div className="createEventBtn button" id="button-5">
                <div id="translate"></div>
                <Link to={this.props.activeUser ? '/events/new' : '/login'}>
                  <button
                    type="submit"
                    name="create_event"
                    className="actual-button">
                    Create New Event
                </button>
                </Link>
              </div>

              <div className="listEventBtn button" id="button-5">
                <div id="translate"></div>
                <Link to={this.props.activeUser ? '/events' : '/login'}>
                  <button
                    type="submit"
                    name="view_event"
                    className="actual-button">
                    View Events
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function ms2p(globalState) {
  return {
    activeUser: globalState.activeUser,
  }
}

export default connect(ms2p)(Home);
