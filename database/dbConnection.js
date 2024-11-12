const mongoose=require('mongoose')

const connectionString =process.env.CONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB atlast Connction Successfull");
}).catch(err=>{
    console.log("MongoDB Connction Failed");
    console.log(err);
})