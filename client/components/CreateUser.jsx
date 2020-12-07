import React from 'react'
import { connect } from 'react-redux'
import { addNewUser, changeActiveUser } from '../actions/users'
import { Redirect } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import S3FileUpload from 'react-s3';

const config = {
  bucketName: 'bike-race',
  dirName: 'photos', /* optional */
  region: 'ap-southeast-2',
  accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
  secretAccessKey: `${process.env.AWS_SECRET_API_KEY}`,
}

export class CreateUser extends React.Component {
  state = {
    imgURL: '',
    username: '',
    email: '',
    bikeType: '',
    redirect: false
  }
  
  checkForExistingUser =(newUsername)=>{
    let checkUsername = this.props.users.filter(user => user.username.includes(newUsername))
    return checkUsername.length == 0
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    
    if(this.checkForExistingUser(this.state.username)){
      let newUser = { ...this.state }
      delete newUser.redirect
      this.props.dispatch(addNewUser(newUser))
      this.props.dispatch(changeActiveUser(newUser))
      this.setState({
        imgURL: '',
        username: '',
        email: '',
        bikeType: '',
        redirect: true
      })
    }else{
      alert("Sorry Username Taken")
    }

  }

  handleTakePhoto = (dataUri) => {
    this.setState({imgURL: dataUri})
    console.log(this.state);
  }
  
  handleImageChange =(event)=>{
    let file = event.target.files[0]
    console.log()
    S3FileUpload.uploadFile(file, config)
    .then(data =>  this.setState({imgURL: data.location}))
    .catch(err => console.error(err))
  }

  render() {
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to='/' />
    }
    
    return (
      <div>
        <h1>Create Profile</h1>
        <form className='formBox' onSubmit={this.handleSubmit}>

          <label htmlFor="imgURL">profile picture</label>
          <input className='formInput'
            type="file"
            onChange={this.handleImageChange}
            name="imgURL"
            accept="image/*"
             />
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username"
            onChange={this.handleChange}
            value={this.state.username} />

          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email"
            onChange={this.handleChange}
            value={this.state.email} />


          <label htmlFor="bikeType">Bike type:</label>
          <select id="bikeType" name="bikeType"
            onChange={this.handleChange}
            value={this.state.bikeType}>
            <option defaultValue></option>
            <option value="mountain">Mountain</option>
            <option value="bmx">BMX</option>
            <option value="road">Road</option>
            <option value="unicycle">Unicycle</option>
          </select>

          <button type="submit">Confirm</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(globalState) {
  return {
    users: globalState.users,
  }
}

export default connect(mapStateToProps)(CreateUser)