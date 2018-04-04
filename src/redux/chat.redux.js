import axios from 'axios'
import io from 'socket.io-client'
const socket = io("http://localhost:9093")

//获取信息列表
const MSG_LIST='MSG_LIST'
//获取新的信息
const MSG_RECV='MSG_RECV'
//信息是否已读
const MSG_READ='MSG_READ'

const initState={
    chatmsg:[],
    users:{},
    unread:0
}

export function chat (state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,'chatmsg':distinct(action.payload.msgs),users:action.payload.users,"unread":action.payload.msgs.filter(v=>!v.read&&v.to==action.payload.userid).length}
        case MSG_RECV:
            const n =action.payload.to==action.userid?1:0
                return {...state,'chatmsg':distinct([...state.chatmsg,action.payload]),unread:state.unread+n}
        case MSG_READ:
            const{from ,num}=action.payload
            return {...state,chatmsg:state.chatmsg.map(v=>({...v,read:from==v.from?true:v.read})),unread:state.unread-action.payload.num}
        default:
            return state
    }
}
export function sendMsg(from ,to , msg){
    return dispatch=>{
        socket.emit('sendmsg',{from ,to ,msg})
    }
}
function msgRecv(data,userid){
    return {type:MSG_RECV,payload:data ,userid}
}
export function recvMsg(){
    return (dispatch,getState)=>{
        socket.on("recvmsg",function(data){
           const userid =getState().user._id;
            dispatch(msgRecv(data,userid))
        })
    }
}
function msgList(msgs,users,userid){
    return {type:'MSG_LIST',payload:{msgs,users,userid}}
}
export function getMsgList(){
    return (dispatch,getState)=>{
        axios.get("/user/getmsglist").then(res=>{
            const userid=getState().user._id
            if(res.status==200&&res.data.code==0){
                dispatch(msgList(res.data.msgs,res.data.users,userid))
            }
        })
    }
}
function msgRead(data){
    return {type:MSG_READ,payload:data}
}
export function readMsg(from){
    return (dispatch,getState)=>{
        axios.post('/user/readmsg',{from})
        .then(res=>{
            const userid=getState().user._id
            if(res.status==200&&res.data.code==0){
                dispatch(msgRead({userid,from,num:res.data.num}))
            }
        })
    }
}
//数组去重
function distinct(arr){
       var  i,
        j,
        len = arr.length;
    for(i = 0; i < len; i++){
        for(j = i + 1; j < len; j++){
            if(arr[i] == arr[j]){
                arr.splice(j,1);
                len--;
                j--;
            }
        }
    }
    return arr;
}