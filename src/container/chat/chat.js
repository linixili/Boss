import React from "react"
import {List, InputItem,NavBar,Icon,Grid} from "antd-mobile"
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { getMsgList } from '../../redux/chat.redux'
import { recvMsg } from '../../redux/chat.redux'
import { sendMsg } from '../../redux/chat.redux'
import { readMsg } from '../../redux/chat.redux'
import {getChatId} from "../../util"
import QueueAnim from 'rc-queue-anim'
import "../../index.css"

@connect(state=>state,{sendMsg,getMsgList,recvMsg,readMsg})
class Chat extends React.Component{
    constructor(props) {
        super(props);
        this.state = {text:"",msg:[]};
    }
    componentDidMount() {
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
        }
        this.props.recvMsg();

    }
    componentWillUnmount(){
        const to =this.props.match.params.user
        this.props.readMsg(to);
    }
    fixCarousel(){
         setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }
    handlerSubmit(){
        const from =this.props.user._id;
        const to = this.props.match.params.user
        const msg=this.state.text
        this.props.sendMsg(from ,to ,msg)
        this.setState({
            "text":"",
            "showEmoji":false
        })
    }
    render(){
        const emoji= '😀 😁 😂 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 😐 😶 😏 😣 😥 😮 😯 😪 😫 😴 😌 😛 😜 😝 😒 😓 😕 😲 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 😬 😰 😱 😳 😵 😡 😷 😇 😈'.split(' ').map(v=>({text:v}))
        const user=this.props.match.params.user
        const Item=List.Item
        if(!this.props.chat.users[user]){
            return null
        }
        const chatid =getChatId(user,this.props.user._id)
        const chatmsgs=this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
        return (
            <div id="chatpage">
                <NavBar
                    type="drak"
                    className="fixed-header"
                    icon={<Icon type="left"></Icon>}
                    onLeftClick={()=>{
                        this.props.history.goBack()
                    }
                    }>
                    {this.props.chat.users[user].name}
                </NavBar>
                 <div className="messageList">
                     <QueueAnim delay={100}type="left">
                     {chatmsgs.map((v,i)=>{
                         return v.from==user?
                             (<List key={i} className="from_others">
                                 <Item className="icon_others" extra={<img src={this.props.chat.users[user].icon} alt=""/>}><p className="leftMessage">{v.content}</p></Item>
                             </List>):
                             (<List key={i}>
                                 <Item className="chat-me" extra={<img src={this.props.user.icon} alt=""/>}>{v.content}</Item>
                             </List>)
                     })}
                     </QueueAnim>
                 </div>
                <div className="stick-footer">
                    <List>
                        <InputItem placeholder="请输入"
                                   className="inputBox"
                                   value={this.state.text}
                                   extra={
                                   <div>
                                        <span style={{fontSize:20,marginRight:10}} onClick={()=>{this.setState({"showEmoji":!this.state.showEmoji});this.fixCarousel()}}>😀</span>
                                        <span onClick={()=>this.handlerSubmit()}>发送</span>
                                    </div>
                                }
                                   onChange={v=>{
                            this.setState({
                                text:v
                            })
                       }}
                        ></InputItem>
                    </List>
                    {this.state.showEmoji?(<Grid
                        data={emoji}
                        columnNum={9}
                        isCarousel={true}
                        carouselMaxRow={4}
                        onClick={(el)=>{
                            this.setState({
                                text:this.state.text+el.text
                            })
                        }}
                    />):null}
                </div>
            </div>
        )
    }
}
export default Chat