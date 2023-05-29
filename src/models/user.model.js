import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  
  lname: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true
  },
  
  photo: {
    type: String,
    default: ''
  },
  
  password: {
    type: String,
    required: true 
  },
  
  bio: {
    type: String,
    default: ''
  },
  
  writingCategories: {
    type: [String],
    default: []
  },
  
  facebook: {
    type: String,
    default: ''
  }, 
  
  twitter: {
    type: String,
    default: ''
  }, 
  
  instagram: {
    type: String,
    default: ''
  }, 
  
  linkedIn: {
    type: String,
    default: ''
  },
}, {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  })

userSchema.virtual('fullname').get(function() {
  return `${this.fname} ${this.lname}`
})

const UserModel = mongoose.model('User', userSchema)
export default UserModel

