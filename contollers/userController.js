const users = require('../models/usersModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

exports.registerController = async (req, res) => {
    console.log("inside registerController");
    console.log(req.body);
    const { id, firstname, lastname, email, password, phone } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("User already exist .. Please Login!!")
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new users({
                id, firstname, lastname, email, password: hashedPassword, phone
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.loginController = async (req, res) => {


    console.log("Inside loginController");
    const { email, password } = req.body
    console.log(email, password);
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const passwordMatch = await bcrypt.compare(password, existingUser  .password);
            if (passwordMatch) {
                const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD)
                res.status(200).json({ user: existingUser, token })
            }
            else {
                res.status(401).json("Incorrect Email or Password"); // Password does not match
            }
        } else {
            res.status(404).json("Incorrect Email or Password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.allUserController = async (req, res) => {
    console.log("Inside allUserController");
    try {
        const allUsers=await users.find()
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.oneUserController = async(req,res)=>{
    console.log("inside oneUserController");
    const {email} =req.body

    try{
        const user = await users.findOne({email})
        
        res.status(200).json({
            userId:user.id,
            firstname:user.firstname,
            lastname:user.lastname,
            email:user.email,
            phone:user.phone

        })
    }catch(err){
        res.status(401).json(err)
    }
    
}