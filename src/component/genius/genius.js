import React from 'react'
import axios from 'axios'
import './genius.css'
class Genius extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        axios.get('/user/list?type=boss').then(res=>{
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
                {this.state.data.map(v=>
                    v.icon?( <div className="messageList123" key={v._id} onClick={()=>this.handlerClick(v._id)}>
                                <div className="image123">
                                    <img src={v.icon} alt=""/>
                                </div>
                                <div className="message123">
                                    <p>我是BOSS：{v.user}</p>
                                    <p>我要招聘：<span>{v.title}</span></p>
                                    <p>公司资产：<span>{v.money}</span></p>
                                    <div className="info123"><span>招聘简介：</span><span>{v.desc}</span></div>
                                </div>
                            </div>):null
                    )}
            </div>
        )
    }
}
export default Genius