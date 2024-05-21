           //////// One to few  ///////

const mongoose= require("mongoose");
const {Schema}= mongoose;

//Connecting Mongoose:
main()
.then((res)=>{
    console.log("Connection built");
})
.catch((err)=>{
    console.log("Error found",err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

//Defining Schema:
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    addresses:[
        {
            _id:false, ////if we don't want _id to be created for address(which is by default created by mongoDB).
            location:String,
            city:String,
        },
    ],
});

// define model:= models are used to make collections in db.
const User=mongoose.model("User",userSchema);

//add items:
const addUsers=async()=>{
    user1=new User({
        username:"Sachin Ravindra",
        addresses:[{
            location:"San Marry,Street 7",
            city:"London"
        }]
    });

    user1.addresses.push({
        location:"221B Baker Street",
        city:"Paris"
    });
    let result= await user1.save();
    console.log(result);
}

addUsers();