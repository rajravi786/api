const  express = require("express");
const cors = require("cors");
require('./db/config.js');
const User = require("./db/User.js");
const Reminder = require("./db/Reminder.js")
const app = express();




app.use(express.json());
app.use(cors());







//user post 


app.post("/register",async(req,res) => {
    let user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    });
    let result = await user.save();
    result = result.toObject();
    delete result.password
    res.send(result);

})


// user login

app.post("/login", async(req,res) =>{
if(req.body.password && req.body.email){
    let user = await User.findOne(req.body).select("-password");
    if(user){
        res.send(user)
    } else {
         res.send({ result:'No User Found'})
    }
} else {
  res.send({result:"no user Found"})
}
})


//getUser


app.get("/user" , async (req,res) => {
    const user = await User.find();
    res.send(user);
})





//delete method user

app.delete("/user/:id" , async(req,res) => {
    const result = await User.deleteOne({_id:req.params.id})
    res.send(result) 
});















// add -reminder

app.post("/reminder",async(req,res) => {
   let reminder = new Reminder({
       medication:req.body.medication,
        description:req.body.description,
        selectedDate:req.body.selectedDate,
        selectedTime:req.body.selectedTime,
         userId:req.body.userId,
   });
   let result = await reminder.save(); 
   res.send(result)
})




//get_reminder

app.get("/reminder" , async (req,res) => {
    const reminder = await Reminder.find();
    res.send(reminder);
})


//delete method

app.delete("/reminder/:id" , async(req,res) => {
    const result = await Reminder.deleteOne({_id:req.params.id})
    res.send(result) 
});




//update reminder

app.get("/reminder/:id",async(req,res)=>{
    let result = await Reminder.findOne({_id:req.params.id});
    if (result){
        res.send(result)
    }else{
        res.send({result:"no reminder"})
    }

})



app.listen(8000);