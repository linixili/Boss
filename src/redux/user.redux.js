import axios from 'axios'
import {redirectUrlPath} from '../util.js'
//设定action类型
const AUTH_SUCCESS='AUTH_SUCCESS'
const REGISTER_ERROR = 'REGISTER_ERROR'
const LOGIN_ERROR='LOGIN_ERROR'
const INFO_DATA='INFO_DATA'
const LOGO_OUT='LOGO_OUT'
//初始化默认状态
const initState={
    redirectTo:'',
    isAuth:false,
    user:'',
    pwd:'',
    msg:'',
    type:''
}
//创建reducer
export function user (state=initState , action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state,isAuth:true, redirectTo:redirectUrlPath(action.payload),...action.payload}
        case REGISTER_ERROR:
            return {...state,isAuth:false,msg:action.msg}
        case LOGIN_ERROR:
            return  {...state,isAuth:false,login_msg:action.msg}
        case INFO_DATA:
            return  {...state,...action.payload}
        case LOGO_OUT:
            return {...state,redirectTo:'/login'}
        default:
            return state
    }
}
//action 生产函数
function loginError(msg){
    return {msg,type:LOGIN_ERROR}
}
function registerError(msg){
    return {msg,type:REGISTER_ERROR}
}
function authSuccess(data){
    return {type:AUTH_SUCCESS,payload:data}
}
export function infoData(data){
    return {type:INFO_DATA,payload:data}
}
export function logoutSubmit(data){
    return {type:LOGO_OUT,data};
}
//更新用户信息
export function update(data){
    return dispatch=>{
        axios.post('/user/update',data)
        .then(res=>{
            if(res.status===200){
                if(res.data.code===0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(loginError(res.data.msg))
                }
            }
        })
    }
}
//逻辑处理创建action
export function login ({user,pwd}){
    if(!user||!pwd){
        return loginError('用户名密码必须输入')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd}).then((res,err)=>{
            if(res.status===200){
                if(res.data.code===0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(loginError(res.data.msg))
                }
            }
        })
    }
}
export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd){
        return registerError('用户名密码必须输入')
    }
    if(pwd!==repeatpwd){
        return registerError("两次输入的密码不一样")
    }
   return dispatch=>{
       axios.post('/user/register',{user,pwd,type}).then(res=>{
           if(res.status===200){
               if(res.data.code===0){
                   const {_id,user,type}=res.data.data
                   dispatch(authSuccess({_id,user,type}))
               }else{
                   dispatch(registerError(res.data.msg))
               }
           }
       })
   }
}