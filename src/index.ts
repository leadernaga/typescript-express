import express, { Request, Response } from "express";
import userRoute from "./routes/usersRoutes/user.Route";
import bunyan from "bunyan";

const app=express();



// bunyan log

export const log = bunyan.createLogger({name:"expressApp"})

log.info("hi")



app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use("/user",userRoute)

app.get("/",(req:Request,res:Response)=>{

    res.send("hi")
})


app.listen(8080,async()=>{
    console.log("serever started")
})

export default app;