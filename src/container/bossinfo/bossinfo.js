import React from 'react'
import {NavBar, TextareaItem ,InputItem,Button} from 'antd-mobile'
import Avatar from '../../component/avatar/avatar'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'
@connect(state=>state.user,{update})
class Boss extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {icon:''};
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
               <NavBar mode="dark">BOSS完善信息页</NavBar>
               <Avatar imgUrl={this.state.icon} avatarSelect={v=>this.avatarSelect(v)}></Avatar>
               <InputItem onChange={v=>this.onChange('title',v)}>招聘职位</InputItem>
               <InputItem onChange={v=>this.onChange('company',v)}>公司名称</InputItem>
               <InputItem onChange={v=>this.onChange('money',v)}>职位薪资</InputItem>
               <TextareaItem
                   onChange={(v)=>this.onChange('desc',v)}
                   title="职位要求"
                   rows={3}
                   autoHeight
               ></TextareaItem>
               <Button type="primary" onClick={()=>{
               this.props.update(this.state)
               }}>保存</Button>
           </div>
        )
    }
}
export default Boss