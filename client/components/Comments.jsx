import React from "react";
import { connect } from "react-redux";
import { addComment } from "../actions/events";
import { Redirect, Link } from "react-router-dom";

class Comments extends React.Component {
  state = {
    newComment: "",
    redirect: false,
  };

  handleChange = (event) => {
    this.setState({
      newComment: event.target.value,
    });
  };

  submitComment = (username, eventId) => {
    let newComment = {
      username: username,
      comment: this.state.newComment,
      event_id: eventId,
    };
    this.props.dispatch(addComment(newComment, eventId));
    this.setState({ newComment: "" });
    this.setState({ redirect: true });
  };

  render() {
    const { redirect } = this.state;
    const url = `/events/${this.props.match.params.id}`;
    if (redirect) {
      return <Redirect to={url} />;
    }

    //find event based on params
    let eventComments = this.props.events.find(
      (event) => event.id == this.props.match.params.id
    );

    return (
      <>
        <Link to={url}>Back to Event</Link>
        <h2 className="curretnEventsHeader">Event Comments</h2>

        <ul>
          {eventComments.comments.map((comments) => {
            return (
              <li key={comments.id}>
                <div className="comment-cards">
                  <h3>{comments.username}</h3>
                  <p>{comments.comment}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <h2 className="curretnEventsHeader">Add Comment</h2>
        <div className='comment-box'>
         
        <input className='comment-field'
          type="text"
          placeholder="Enter comment"
          onChange={this.handleChange}
          value={this.state.newComment}
        />
        
        <div className="listEventBtn button" id="button-5">
          <div id="translate"></div>
          <button
            className="actual-button"
            onClick={() =>
              this.submitComment(
                this.props.activeUser.username,
                this.props.match.params.id
              )
            }
          >
            Submit comment
          </button>
        </div>
        </div>
        <Link to={url}>Back to Event</Link>
      </>
    );
  }
}

function mapStateToProps(globalState) {
  return {
    events: globalState.events,
    activeUser: globalState.activeUser,
  };
}

export default connect(mapStateToProps)(Comments);
