export function redirectUrlPath({type,icon}){
    let url= (type=='boss')?'/boss':'/genius'
    if(!icon){
        url+='info'
    }
    return url
}
export function getChatId(userId,targetId){
    return [userId,targetId].sort().join("_")
}