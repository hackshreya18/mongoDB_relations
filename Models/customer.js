           //////// One to many  ///////

const mongoose=require("mongoose");
const {Schema}=mongoose;
//Connection
main()
.then(()=>{
    console.log("Connection built");
})
.catch((err)=>{
    console.log("Error found",err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}
//Schema:
const orderSchema=new Schema({
    item:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    }    
})
const customerSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    orders:[
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        }
    ]
})

//These two MiddleWare are triggered during deletion(write above models):

//Pre: work before query(deletion):
customerSchema.pre("findOneAndDelete" ,async ()=>{
    console.log("Pre Middleware");
})

//Post: Works after query(deletion):
customerSchema.post("findOneAndDelete",async (customer)=>{
    try{
        if(customer.orders.length){
            let dltcust=await Order.deleteMany({_id:{ $in: customer.orders} });
            console.log(dltcust);
        }
        console.log("Post Middleware");
    }
    catch(err){
        console.log("nf",err);
    }
})


//Models
const Order=mongoose.model("Order",orderSchema);

const Customer=mongoose.model("Customer",customerSchema);

//Add items
const findCustomer=async()=>{
    // let cust1=new Customer({
    //     name :"Rahul Kumar",
    // })

    // const order1= await Order.findOne({item:"Samosa"});
    // const order2= await Order.findOne({item:"Chai"});

    // cust1.orders.push(order1);
    // cust1.orders.push(order2);

    // let result=await cust1.save();
    // console.log(result); 

    let result=await Customer.find({}).populate("orders","item");
    // console.log(result); 
    console.log(result[0]);
}

findCustomer();

// const addOrder=async()=>{
//    let result= await Order.insertMany([
//     {
//         item:"Samosa",
//         price:17,
//     },
//     {
//         item:"Chai",
//         price:10,
//     },
//     {
//         item:"Patties",
//         price:20,
//     },
// ]);
//    console.log(result);
// }
// addOrder();

//addition and deletion of orders:
const addCustomer =async()=>{
    let newCustomer= new Customer({
        name:"Karan Vyaas",
    });

    let newOrder= new Order({
        item:"Chole Bhature",
        price:60,
    });

    newCustomer.orders.push(newOrder);

    await newOrder.save();
    await newCustomer.save();

    console.log("Added items");
}

// addCustomer();

/////normal deletion : here we can't delete orders when customer is deleted(deletion of order is not dependent on customer's deletion).
const dltCustomer = async()=>{
    let data = await Customer.findByIdAndDelete("664c510db5538c8adc312529");
    console.log("deleted",data);
}

// dltCustomer();