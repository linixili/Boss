import React from "react"
import {TabBar} from "antd-mobile"
import PropTypes from "prop-types"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
@withRouter
@connect(state=>state.chat)
class NavLink extends React.Component{
    static propTypes={
        data:PropTypes.array.isRequired
    }
    render(){
        const pathname=this.props.location.pathname
        const navList =this.props.data
        const showTitle =this.props.unread ? '...':0
        return (
           <div style={{position:'fixed',left:0,bottom:0,width:'100%'}}>
               <TabBar tintColor='#259EDE'>
                   {
                       navList.map(v=>(
                           <TabBar.Item
                               badge={v.path=='/msg'?showTitle:0}
                               key={v.path}
                               title={v.text}
                               icon={{uri:require(`../images/${v.icon}.png`)}}
                               selectedIcon={{uri:require(`../images/${v.icon}-active.png`)}}
                               selected={pathname===v.path}
                               onPress={()=>{
                                this.props.history.push(v.path)
                            }}
                           ></TabBar.Item>
                       ))
                   }
               </TabBar>
           </div>
        )
    }
}
export default NavLink