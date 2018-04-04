import React from 'react'
import {NavBar, TextareaItem ,InputItem,Button} from 'antd-mobile'
import Avatar from '../../component/avatar/avatar'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'
@connect(state=>state.user,{update})
class Genius extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            icon:'',
            title:'',
            desc:''
        };
    }
    onChange(k,v){
        this.setState({
            [k]:v
        })
    }
    avatarSelect(v){
        this.setState({
            'icon':v
        })
    }
    render(){
        return (
            <div>
                {this.props.redirectTo&&this.props.redirectTo!=this.props.location.pathname?<Redirect to={this.props.redirectTo}/>:null}
                <NavBar mode="dark">牛人完善信息页</NavBar>
                <Avatar imgUrl={this.state.icon} avatarSelect={v=>this.avatarSelect(v)}></Avatar>
                <InputItem onChange={v=>this.onChange('title',v)}>期望职位</InputItem>
                <TextareaItem
                    onChange={(v)=>this.onChange('desc',v)}
                    title="个人简介"
                    rows={3}
                    autoHeight
                ></TextareaItem>
                <Button type="primary" onClick={()=>{this.props.update(this.state)}}>保存</Button>
            </div>
        )
    }
}
export default Genius