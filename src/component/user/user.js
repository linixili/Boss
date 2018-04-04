import React from 'react'
import {connect} from "react-redux"
import {Result,List,WhiteSpace,Button,Modal} from "antd-mobile"
import browserCookie from 'browser-cookies'
import {logoutSubmit} from"../../redux/user.redux"
import "./user.css"
@connect(state=>state.user,{logoutSubmit})
class User extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
         this.logout = this.logout.bind(this)
      }
    logout(){
        const alert = Modal.alert
        alert("退出",'你确定退出吗？',[
            {text :'取消',onPress:()=>console.log('cancel')},
            {text:'确定',onPress:()=>{
                browserCookie.erase("userid")
                this.props.logoutSubmit();
                window.location.href='/login'
            }},
        ])
    }
    render(){
        return (this.props.user?(
            <div>

                <Result className="userInfo"

                img={<img src={this.props.icon} alt=""/>}
                title={this.props.title}
                message={this.props.type=='boss'?this.props.company:null}>
                </Result>
                <List renderHeader={()=>'简介'}>
                    <List.Item multipleLine>
                        {this.props.title}
                        {this.props.desc.split("/n").map(v=><p key={v}>{v}</p>)}
                        {this.props.money?this.props.money:null}
                    </List.Item>
                </List>
                <p>&nbsp;用户中心</p>
                <WhiteSpace></WhiteSpace>
                <Button type="primary" onClick={this.logout}>退出登录</Button>
            </div>):null
        )
    }
}
export default User