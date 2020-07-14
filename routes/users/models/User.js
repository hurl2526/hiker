const mongoose = require('mongoose')
const moment = require('moment')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const UserSchema = new mongoose.Schema({
  // -- Signup: the recipient enters username, name, email, address object,(address holds fields for number, city and state)
  email:{type:String, unique:true, lowercase:true,required:true},
  password:{type:String,required:true,min: 6},
  profile: {
    name: {type:String, default:'',required:true},
    picture:{type:String, default:''}
  },
  address:{type:String, default:'Please update Address'},
  timestamp: {type:String, default: ()=> moment().format('MMMM Do YYYY, h:mm:ss a')}
})

UserSchema.pre('save',function(next){
  const user = this

  if(!user.isModified('password')) return next()

  bcrypt.genSalt(10,(err,salt)=>{
    if(err) return next(err)

    bcrypt.hash(user.password,salt,(err, hash)=>{
      if(err) return next(err)
      user.password = hash
      next()
    })
  })
})

  module.exports = mongoose.model('user', UserSchema)