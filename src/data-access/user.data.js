import UserModel from '../models/user.model.js'

async function findById(id) {
    return await UserModel.findById(id)
}

async function findByEmail(email) {
    return await UserModel.findOne({ email })
}

async function updateUser(id, changes) {
    const updatedUser = await UserModel.findByIdAndUpdate(
    id, 
    changes, 
    {
      new: true,
      select: {
        email: 0,
        password: 0,
        updatedAt: 0,
        __v: 0,
      }
    },
  )

  return updatedUser
}

async function deleteUser(id) {
    await UserModel.findByIdAndDelete(id)
    return null
}

async function insert(data) {
    return await UserModel.create(data)
}

const usersDB = {
    findById,
    insert,
    updateUser,
    deleteUser,
    findByEmail
}

export default usersDB
