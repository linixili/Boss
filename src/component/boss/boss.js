import React from 'react'
import axios from 'axios'
import './boss.css'
class Boss extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        axios.get('/user/list?type=genius').then(res=>{
            if(res.data.code===0){
                this.setState({data:res.data.data})
            }
        })
    }
    handlerClick(id){
        this.props.history.push(`/chat/${id}`)
    }
    render(){
        return (
            <div  className="geniusList123" >
                {this.state.data.map(v=>(
                   v.icon?( <div className="messageList123" key={v._id} onClick={()=>this.handlerClick(v._id)}>
                       <div className="image123">
                           <img src={v.icon} alt=""/>
                       </div>
                       <div className="message123">
                           <p>我是：{v.user}</p>
                           <p>我要求职：<span>{v.title}</span></p>
                           <div className="info123"><span>我的简介：</span>&nbsp;<span>{v.desc}</span></div>
                       </div>
                   </div>):null
                ))}
            </div>
        )
    }
}
export default Boss