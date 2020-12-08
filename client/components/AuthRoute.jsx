import React from "react"
import { connect } from "react-redux"
import { Redirect, Route } from "react-router"

const AuthRoute = (props) => {

  const isLoggedIn = props.activeUser
  
  if(isLoggedIn == null) { 
      return <Redirect to="/"/>
  }

  return props.children
}

function mapStateToProps(globalstate){
 return { activeUser: globalstate.activeUser }
}

export default connect(mapStateToProps)(AuthRoute)