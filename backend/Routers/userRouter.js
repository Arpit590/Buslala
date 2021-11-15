const router=require('express').Router();
const { verify } = require('crypto');
const { signUp,verifyOtp,User_data,one_way,CheckOneWayBus,UserProfile}=require('../Controllers/UserController')
// const User_data=require('../')

router.route('/signup')
.post(signUp);

router.route('/signup/verify')
.post(verifyOtp)

router.route('/User_data')
.post(User_data)

router.route('/one_way')
.post(one_way)

router.route('/searchOneWayBus')
.post(CheckOneWayBus)

// router.route('/profile')
// .get(UserProfile)

module.exports=router;