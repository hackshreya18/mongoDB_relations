           //////// One to squillion  ///////



const mongoose=require("mongoose");
const {Schema}=mongoose;

//Connection
main()
.then(()=>{
    console.log("Connection built");
})
.catch((err)=>{
    console.log("Error",err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

//Schema:
const userSchema= new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    }
});

const postSchema=new Schema({
    content:{
        type:String,
    },
    likes:{
        _id:false,
        type:Number,
        default:0
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
    }
});

//Models:

const Post=mongoose.model("Post",postSchema);
const User=mongoose.model("User",userSchema);

//Add items:

const addData=async()=>{
    // let user1= new User({
    //     username:"Raj Sharma",
    //     email:"raj123@gmail.com",
    // })

    const user1=await User.findOne({username:"Raj Sharma"});

    let post3=new Post({
        content:"Have a nice day!!",
        likes:101,
    })

    post3.user= user1;

    // let res1=await user1.save();
    let res3=await post3.save();
    console.log(res3);
    

}
// addData();

const getData=async()=>{
    let result=await Post.find({}).populate("user","username");
    console.log(result);
}

getData();

