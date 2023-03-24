const express=require("express")
const app=express()
const {connect}=require("./Connection/Config")
const cors=require("cors")
const {task}=require("./Routes/Task.Route")


app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/",task)
app.listen(8000,async()=>{
      try{
         await connect
         console.log("Connect Successful")
      }
      catch{

      }
})