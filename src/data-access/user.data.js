import UserModel from '../models/user.model.js'

async function findAll() {
    // TODO: add pagination
    return await UserModel.find({})
}

async function findByGoogleId(googleId) {
    return await UserModel.findOne({ googleId })
}

async function deleteUser(id) {
    await UserModel.findByIdAndDelete(id)
    return null
}
