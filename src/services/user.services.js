import userDataValidator from '../validators/user.validators.js'

export default function UserServices({ usersDB }) {
  
  // UPDATE USER
  async function editUser(user, changes) {
    // Validate new changes
    userDataValidator(changes)
    
    // Replace old values with new ones
    // in the user object
    const newUserObject = Object.assign(user, changes)

    // Update user
    const editedUser = await usersDB.updateUser(user._id, newUserObject)
    return {
      id: editedUser.id,
      fullname: editedUser.fullname,
      photo: editedUser.photo,
      bio: editedUser.bio,
      facebook: editedUser.facebook,
      instagram: editedUser.instagram,
      twitter: editedUser.twitter,
      linkedIn: editedUser.linkedIn,
      writingCategories: editedUser.writingCategories,
      joinedOn: new Date(editedUser.createdAt).toDateString(),
    }
  }
  
  // DELETE USER
  async function removeUser(id) {
    // TODO: Fix this delete service
    await usersDB.deleteUser(id)
    return null
  }

  return {
    editUser,
    removeUser
  }
  
}
