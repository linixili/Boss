import React from 'react'
import Logo from '../../component/logo/logo.js'
import { connect } from "react-redux"
import {register} from '../../redux/user.redux'
import '../../index.css'
import {Redirect} from 'react-router-dom'
import {List,InputItem,WhiteSpace,Button,Radio} from 'antd-mobile'

@connect(state=>state.user,{register})
class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:"",
            pwd:'',
            repeatpwd:"",
            type:'genius'
        }
    }
    handleChange(key,val){
        this.setState({[key]:val})
    }
    handleRegister(){
        this.props.register(this.state)
    }
    render(){
        const RadioItem=Radio.RadioItem
        return (
           <div>
               {this.props.redirectTo&&this.props.redirectTo!=this.props.location.pathname?<Redirect to={this.props.redirectTo}/>:null}
               <Logo></Logo>
               <p className={this.props.isAuth?'normal_msg':'err_msg'}>{this.props.msg}</p>
               <List>
                   <InputItem onChange={v=>this.handleChange('user',v)}>用户名</InputItem>
                   <InputItem onChange={v=>this.handleChange('pwd',v)} type="password">密码</InputItem>
                   <InputItem onChange={v=>this.handleChange('repeatpwd',v)} type="password">确认密码</InputItem>
               </List>
               <WhiteSpace/>
               <RadioItem checked={this.state.type=='genius'} onChange={v=>this.handleChange('type','genius')}> 牛人</RadioItem>
               <RadioItem checked={this.state.type=='boss'} onChange={v=>this.handleChange('type','boss')}> BOSS</RadioItem>
               <WhiteSpace/>
               <Button type="primary" onClick={()=>{this.handleRegister()}}>注册</Button>
           </div>
        )
    }
}
export default Register