const express  = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
const connect =() => {
    return mongoose.connect("mongodb+srv://ankit1470:ankit1470@cluster0.mvnmp.mongodb.net/banking?retryWrites=true&w=majority");
};

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, required:false},
    lastName: { type: String, required: true },
    age: { type: Number, required:true},
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true},
    gender: { type: String, required:false,default: 'female'},
    type: { type: String, required:false, default: 'customer'},
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true, 
  }
);
const User = mongoose.model("user", userSchema);

const BranchDetailSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true},
        IFSC:{ type: String, required: true},
        MICR:{ type: Number, required: true},
    },
    {
    versionKey: false,
    timestamps: true, 
    }
)
const BranchDetail = mongoose.model("BranchDetail", BranchDetailSchema);

const MasterAccountSchema = new mongoose.Schema({
       balance: { type: Number, required: true },
      
    },
    {
    versionKey: false,
    timestamps: true, 
})

const MasterAccount = mongoose.model("MasterAccount", MasterAccountSchema);


const SavingsAccountSchema = new mongoose.Schema({
account_number: {type: Number, required: true,unique: true},
 balance: { type: Number, required: true },
intrestRate: { type:Number, required: true}  
    },
    {
    versionKey: false,
    timestamps: true, 
})

const SavingAccount = mongoose.model("SavingAccount", SavingsAccountSchema);

const FixedAccountSchema = new mongoose.Schema({
 
account_number: {type: Number, required: true,unique: true},
 balance: { type: Number, required: true },
intrestRate: { type:Number, required: true},
startDate: { type: Date, required: true},
maturityDate: { type: Date, required: true},  
    },
    {
    versionKey: false,
    timestamps: true, 
   
})

const FixedAccount = mongoose.model("FixedAccount", FixedAccountSchema);

app.get('/users',async (req, res) => {
    try{
  const users = await User.find().lean().exec();
  return res.status(200).send({users})
    }
    catch(err){
        return res.status(500).send({ message:"Something went wrong"})
    }
});
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


app.listen(4000,async()=>{
    try {
   await  connect();
    }
    catch (e) {
        console.log("e")
    }
console.log("listening on port 4000")
})