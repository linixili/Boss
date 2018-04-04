import React from "react"
import {connect} from "react-redux"
import Logo from '../../component/logo/logo.js'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
@connect(state=>state.user,{login})
class Login extends React.Component{
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            user:'',
            pwd:'',
        };
      }
    register(){
        this.props.history.push('./register')
    }
    handleLogin(){
        this.props.login(this.state)
    }
    handleChange(key,val) {
        this.setState({
            [key]: val
        })
    }
    render(){
        return (
            <div>
                {this.props.redirectTo&&this.props.redirectTo!=this.props.location.pathname?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <WingBlank>
                    <p className={this.props.isAuth?'normal_msg':'err_msg'}>{this.props.login_msg}</p>
                    <List>
                        <InputItem onChange={v=>this.handleChange('user',v)}>用户名</InputItem>
                        <InputItem onChange={v=>this.handleChange('pwd',v)} type="password">密码</InputItem>
                    </List>

                    <WhiteSpace/>
                    <Button type="primary" onClick={()=>this.handleLogin()}>登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={()=>this.register()}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login