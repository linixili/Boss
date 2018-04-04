import React from "react"
import {connect} from 'react-redux'
import {NavBar} from "antd-mobile"
import '../../index.css'
import {Route} from "react-router-dom"
import NavLinkBar  from '../navlink/navlink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from "../msg/msg"
import { getMsgList } from '../../redux/chat.redux'
import { recvMsg } from '../../redux/chat.redux'
import { sendMsg } from '../../redux/chat.redux'
import { readMsg } from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim'

@connect(state=>state,{sendMsg,getMsgList,recvMsg,readMsg})
class Dashboard extends React.Component{
      constructor(props) {
        super(props);
        this.state = {};
          if(this.props.location.pathname=="/"){
              window.location.href='/login'
          }
      }

    componentDidMount() {
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
        }
        this.props.recvMsg();

    }
    render(){
        const user =this.props.user
        const pathname=this.props.location.pathname
        const navList =[
            {
                path: '/boss',
                text: "牛人",
                icon: 'boss',
                title: "牛人列表",
                component: Boss,
            },

            {
                path: '/genius',
                text: "BOSS",
                icon: 'job',
                title: "BOSS列表",
                component: Genius,
            },
            {
                path: '/msg',
                text: "消息",
                icon: 'msg',
                title: "消息列表",
                component: Msg,
            },
            {
                path: '/me',
                text: "个人",
                icon: 'user',
                title: "个人中心",
                component: User,
            }
           ]
            const page=navList.find(v=>v.path==pathname)
        return (
           <div>
               <NavBar  className="fixed-header">
                   {
                       navList.find(v=>{
                           if(v.path==pathname){
                               return v
                            }
                       }).title
                   }
               </NavBar>
               <div>
                   <QueueAnim type="scaleX" duration={800}>
                       <Route key={page.path} path={page.path} component={page.component}></Route>
                   </QueueAnim>
               </div>
               <NavLinkBar data={navList} ></NavLinkBar>
           </div>
        )
    }
}
export default Dashboard