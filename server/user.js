const express =require('express')
const Router=express.Router()
const model=require('./modal')
const utility=require('utility')
const User=model.getModel("user")
const Chat=model.getModel("chat")
//登录验证
Router.post('/login',function(req,res){
        const {user,pwd}=req.body
        User.findOne({user,pwd:md5Pwd(pwd)},{pwd:0,_v:0},function(err,doc){
                if(doc){
                        res.cookie('userid',doc._id);
                        return res.json({code:0,msg:"登录成功",data:doc})
                }
                return res.json({code:1,msg:"用户名或密码错误"})
        })
})
//注册用户
Router.post('/register',function(req,res){
        const {user,pwd,type}=req.body
        User.findOne({user},function(err,doc){
                if(doc){
                        return res.json({code:1,msg:"用户名重复"})
                }
                const userModel =new User({user,type,pwd:md5Pwd(pwd)})
                userModel.save(function(e,d){
                        if(err){
                                return res.json({code:1,msg:'后端出错'})
                        }
                        const {user,type,_id}=d;
                        res.cookie('userid',_id)
                        return res.json({code:0,msg:'用户创建成功',data:{user,type,_id}})
                })
        })
})
Router.get('/info',function(req,res){
        const {userid}=req.cookies
        if(!userid){
                return res.json({code:1})
        }
        User.findOne({_id:userid},{pwd:0,_v:0},function(err,doc){
                if(err){
                        return res.json({code:1,msg:"后端出错了"})
                }
                return res.json({code:0,data:doc});
        })
})
Router.post('/update',function(req,res){
        const {userid}=req.cookies
        if(!userid){
                res.dumps({code:1})
        }
        const body=req.body
        User.findByIdAndUpdate(userid,body,function(err,doc){
           if(doc){
                   const data=Object.assign({},{user:doc.user,type:doc.type},body)
                   return res.json({code:0,data})
           }
        })
})
Router.get('/list',function(req,res){
        const {type} =req.query;
        User.find({type},{pwd:0},function(err,doc){
                if(doc){
                   return res.json({data:doc,code:0})
                }
        })
})
Router.get("/getmsglist",function(req,res){
        const userid =req.cookies.userid
        User.find({},function(e,doc){
                let users={}
                doc.forEach((v)=>{
                        users[v._id]={name:v.user,icon:v.icon}
                })
                Chat.find({"$or":[{from:userid},{to:userid}]},function(err,doc){
                        if(!err){
                                console.log(doc)
                                return res.json({msgs:doc,code:0,users:users})
                        }
                })
        })

})
Router.post("/readmsg",function(req,res){
        const userid=req.cookies.userid
        const {from } =req.body
        Chat.update({from,'to':userid},{'$set':{'read':true}},{'multi':true},function(err,doc){
                if(!err){
                        return res.json({'code':0,num:doc.nModified})
                }
        })
})
function md5Pwd(pwd){
        const salt = 'zuo_bian_yi_ge_mo_mo_da@#%$^$&asdf'
        return utility.md5(salt+pwd);
}
module.exports =Router