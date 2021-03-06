import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom"
import {infoData} from '../../redux/user.redux.js'
@withRouter
@connect(null,{infoData})
class AuthRoute extends React.Component{
    componentDidMount() {
        //获取用户信息
        //是否登录 login不需要跳转 用户信息是boss还是牛人
        const publicList=['/login','/register']
        const pathname= this.props.location.pathname
        if(publicList.indexOf(pathname)>-1){
            return null
        }
        //用户信息是否完善
        axios.get('/user/info').then(res=>{
            if(res.status===200){
               if(res.data.code===0){
                    this.props.infoData(res.data.data)
               }else{
                  this.props.history.push('/login')
               }
            }
        })
    }
    render(){
        return  null
    }
}

export default AuthRoute