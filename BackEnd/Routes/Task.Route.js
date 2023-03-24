const express=require("express")
const task=express.Router()
const {TaskModel}=require("../Model/Task.Model")
task.get("/get",async(req,res)=>{
    try{
       const data=await TaskModel.find()
         res.send(data)
    }
    catch{
       res.send("err")
    }
})
task.post("/post",async(req,res)=>{
    let payload=req.body
    try{
        const Task=new TaskModel(payload)
        await Task.save()
        res.send(Task)
    }
    catch{
        res.send("err")
    }
})
task.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    try{
         await TaskModel.findByIdAndUpdate({"_id":id},payload)
         res.send("update")
    }
    catch{
        res.send("update error")
    }
})
module.exports={
    task
}