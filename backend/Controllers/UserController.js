const bcrypt= require('bcrypt');
const _=require('lodash');
const axios=require('axios');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const otpGenerator=require('otp-generator');
const {User}=require('../Models/User_models')
const {Otp}=require('../Models/OtpModels');
const { Profile}=require('../Models/User_info');
const{Trip}=require('../Models/TripModels')
const {Businfo}=require('../Models/BusModel')
// ******************************************SignUp*****************************************************************

module.exports.signUp=async(req,res)=>{
  const user=await User.findOne({
      number:req.body.number

  });
  if(user)return res.status(400).send("User Already Registered!!")
   const OTP=otpGenerator.generate(6,{
       digits:true,alphabets:false,upperCase:false,specialChars:false
   });
   const number= req.body.number;
   const accountSID="AC6d8e476f9873f0d5b3a8311f7259f61b"
   const authToken="2f33dcff6d5bf26828248ef6502702e9"
   const serviceID="VAf64da868bdd10b94eaca68eb09726920"
   const client=require('twilio')(accountSID,authToken)
   client.messages.create({
       to:`+91${number}`,
       from:'+17633436006',
       body:`Your Buslala Otp:${OTP}`
   })

   console.log(OTP)
   const otp=new Otp({number : number,otp:OTP});
   const salt =await bcrypt.genSalt(10)
   otp.otp=await bcrypt.hash(otp.otp,salt);
   const result =await otp.save();
   return res.status(200).send("Otp sent successfully");


}

// ********************************************verifyOtp******************************************************

module.exports.verifyOtp=async(req,res)=>{
const otpHolder=await Otp.find({
    number:req.body.number
});
if(otpHolder.length===0) return res.status(400).send("You use an expired Otp!!")
const rightOtpFind = otpHolder[otpHolder.length - 1];
// console.log(rightOtpFind)
console.log(req.body.otp)
// const rightOtp=await req.body.otp;
const validuser=await bcrypt.compare(req.body.otp,rightOtpFind.otp);
if(rightOtpFind.number===req.body.number&&validuser){
    const user = new User(_.pick(req.body,["number"]));
    user.save();
    console.log(user);
    const token = user.generateJWT();
    
    const OTPDelete=await Otp.deleteMany({
        number:rightOtpFind.number
    });
    return res.status(200).send({
        message: "User Register Successfully",
        token:token,
        // data:result,
    });
 } else{
       return res.status(400).send("Wrong Otp")

    }
}
// ********************************************Profile Data Route*************************************************
module.exports.User_data=async(req ,res)=>{
    var profile = new Profile({
        name: req.body.name,
        Email: req.body.Email,
        gender: req.body.gender,
        Age: req.body.Age,

    })
    
    profile.save(() => {
        res.send("Data saved")
    })
}

module.exports.one_way=async(req,res)=>{
    var trip = new Trip({
        Source: req.body.Source,
        Destination: req.body.Destination,
        Date: req.body.Date

    }) 
    trip.save(() => {
        res.send("Booking Saved")
    })
}

// module.exports.CheckOneWayBus=async(req,res)=>{
//     const busdata= new Businfo({
//         Source:req.body.Source,
//         Destination:req.body.Destination,
//         Date:req.body.Date
//     })
//     busdata.save(()=>{
//        res.send("<h1>Bus data saved</>")
//     })
//     // res.send(busData)
// };

module.exports.CheckOneWayBus=async(req,res)=>{
    const Find_bus=await Businfo.findOne({
        Source:req.body.Source,
        Destination:req.body.Destination,
  
    });
    if(Find_bus)return res.status(200).send(Find_bus)
    else return res.status(400).send("Sorry Bus is not avialable for this route!!")
}