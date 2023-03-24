const mongoose=require("mongoose")

const taskSchema=mongoose.Schema({
    title:{type:String,required:true},
    heading:{type:String,required:true},
    assigned:{type:String,required:true},
    status:{type:String,required:true}
})
const TaskModel=mongoose.model("task",taskSchema)

module.exports={
    TaskModel
}