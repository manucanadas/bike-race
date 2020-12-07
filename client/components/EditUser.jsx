import React from 'react'
import { connect } from 'react-redux'
import { editUser } from '../actions/users'
import { Redirect } from 'react-router-dom'
import S3FileUpload from 'react-s3';


const config = {
  bucketName: 'bike-race',
  dirName: 'photos', /* optional */
  region: 'ap-southeast-2',
  accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
  secretAccessKey: `${process.env.AWS_SECRET_API_KEY}`,
}

export class EditUser extends React.Component {
  state = {
    username: this.props.activeUser.username,
    email: this.props.activeUser.email,
    imgURL: this.props.activeUser.imgURL,
    bikeType: this.props.activeUser.bikeType,
    redirect: false
  }

  checkForExistingUser =(newUsername)=>{
    let checkUsername = this.props.users.filter(user => user.username.includes(newUsername))
    if(checkUsername.length != 0){
      if(this.props.activeUser.username == checkUsername[0].username) return true
      else return false
    }else return true
  }

  handleImageChange =(event)=>{
    let file = event.target.files[0]
    console.log()
    S3FileUpload.uploadFile(file, config)
    .then(data =>  this.setState({imgURL: data.location}))
    .catch(err => console.error(err))
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    if(this.checkForExistingUser(this.state.username)){
      let updatedUser = {...this.state}
      delete updatedUser.redirect
      this.props.dispatch(editUser(this.props.activeUser.id, updatedUser))
      this.setState({redirect: true})
    }else{
      alert("Sorry Username Taken")
    }

  }

  render() {
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to='/users/active' />
    }

    return (
      <div>
        <h1 className='editUserHeader'>Edit your profile, {this.props.activeUser.username}</h1>
        <div className='editUserBox'>
        <form className='editUserContainer'>

          <label htmlFor="username" className='editUserLabel'>Username:</label>
          <input  className='editUserInput'
            type="text"
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <br/>
          <label htmlFor="email" className='editUserLabel'>Email</label>
          <input  className='editUserInput'
            type="text"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <br/>
          <label htmlFor="imgURL" className='editUserLabel'>imgURL</label>
          <input className='formInput'
            type="file"
            onChange={this.handleImageChange}
            name="imgURL"
            accept="image/*"
             />
          <br/>
          <label htmlFor="bikeType" className='editUserLabel'>Bike type:</label>
          <select  className='editUserInput'
            name="bikeType"
            onChange={this.handleChange}
            value={this.state.bikeType}>
            <option value="Mountain">Mountain</option>
            <option value="BMX">BMX</option>
            <option value="Road">Road</option>
            <option value="Unicycle">Unicycle</option>
          </select>
          <br/>
        </form>
          <div className="button" id="button-5">
            <div id="translate"></div>
              <button className="actual-button" type="submit" onClick={this.handleSubmit}>Confirm</button>
            </div>
          </div>
      </div>
    )
  }
}

function mapStateToProps(globalState) {
  return {
    activeUser: globalState.activeUser,
    users: globalState.users,
  }
}

export default connect(mapStateToProps)(EditUser)
