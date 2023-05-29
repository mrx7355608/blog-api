import UserServices from "../services/user.services.js"
import usersDB from '../data-access/user.data.js'


const userServices = UserServices({ usersDB })

export default function UserControllers() {

  async function getMe(httpRequestObject) {
    const user = httpRequestObject.user
    const requiredUserData = {
      fullname: user.fullname,
      photo: user.photo,
      bio: user.bio,
      writingCategories: user.writingCategories,
      id: user.id,
      facebook: user.facebook,
      instagram: user.instagram,
      twitter: user.twitter,
      linkedIn: user.linkedIn,
      joinedOn: new Date(user.createdAt).toDateString()
    }
   
    return {
      statusCode: 200,
      body: { user: requiredUserData }
    }
  }

  async function update(httpRequestObject) {
    const user = httpRequestObject.user

    // Destructure required changes
    const changes = httpRequestObject.body
    if (!changes || Object.keys(changes).length < 1) {
      return {
        statusCode: 400,
        body: { error: 'NO changes are provided' }
      }      
    }

    // Call the service
    const editedUser = await userServices.editUser(user, changes)
    return {
      statusCode: 200,
      body: { user: editedUser }
    }
  }  

  async function  deleteUser(httpRequestObject) {
    const { user } = httpRequestObject
    await userServices.removeUser(user._id)
    return {
      statusCode: 204,
      body: { message: 'Account removed successfully' }
    }
  }  

  return { 
    getMe, 
    update, 
    deleteUser 
  }
}
