import React from 'react'
import {Grid} from 'antd-mobile'
import './avatar.css'
import PropTypes from 'prop-types'

class Avatar extends React.Component{
    static propTypes={
        avatarSelect:PropTypes.func.isRequired
}
      constructor(props) {
        super(props);
          this.state={
              avatarListShow:true,
          }
      }
    onChange(k,v){
        this.setState({
            [k]:v
        })
    }
    render(){
        const avatarList='01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16'.split(",").map(v=>({
            icon:require(`../images/${v}.jpg`)
        }))
       return (
           <div>
               <div className="avatarInfo" onClick={()=>this.onChange('avatarListShow',true)}>{this.props.imgUrl? <img src={this.props.imgUrl} alt=""/>:'请选择头像'}</div>
               {this.state.avatarListShow?<Grid data={avatarList} onClick={(v)=>{
                    this.props.avatarSelect(v.icon)
                    this.onChange('avatarListShow',false)}
                }></Grid>:''}
           </div>
       )
    }
}

export default Avatar