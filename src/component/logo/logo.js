import React from "react"
import logo from "./logo.jpg"
import "./logo.css"
class Logo extends React.Component{
    render(){
        return (
            <div  className="logo-container">
               <div className="img"> <img src={logo} alt=""/> </div>
            </div>
        )
    }
}
export default Logo

