import React from "react"
import {connect} from "react-redux"
import {List,Badge} from "antd-mobile"
import { getMsgList } from '../../redux/chat.redux'
import { recvMsg } from '../../redux/chat.redux'
import { sendMsg } from '../../redux/chat.redux'
import { readMsg } from '../../redux/chat.redux'

@connect(state=>state,{sendMsg,getMsgList,recvMsg,readMsg})
class Msg extends React.Component{
      constructor(props) {
        super(props);
        this.state = {};
      }
    getLastElement(arr){
        return arr[arr.length-1]
    }

    componentDidMount() {

    }
    render(){
        const msgGroup={}
        const Item=List.Item
        const userid=this.props.user._id
        const Brief=Item.Brief
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid]=msgGroup[v.chatid]||[]
            msgGroup[v.chatid].push(v)
        })
        const chatList=Object.values(msgGroup).sort((a,b)=>{
            const alast =this.getLastElement(a)
            const blast =this.getLastElement(b)
            return blast-alast
        })
        return (
            <div style={{marginTop:50}}>
                      {chatList.map(v=>{
                          const last = this.getLastElement(v)
                          const targetId=last.from==userid?last.to:last.from
                          const userinfo=this.props.chat.users
                          const name=userinfo[targetId]?userinfo[targetId].name:''
                          const icon=userinfo[targetId]?userinfo[targetId].icon:null
                          const unreadNum=v.filter(m =>!m.read && m.to==userid).length
                         return(
                             <List  key={last._id}>
                                 <Item
                                     arrow="horizontal"
                                     extra={<Badge text={unreadNum}></Badge>}
                                     thumb={<img src={icon} alt=""/>}
                                     onClick={()=>{
                                        this.props.history.push('/chat/'+targetId)
                                    }}
                                 >
                                     <Brief>
                                         {name}
                                     </Brief>
                                     {last.content}

                                 </Item>
                             </List>
                          )
                      })}
            </div>
        )
    }
}
export default Msg