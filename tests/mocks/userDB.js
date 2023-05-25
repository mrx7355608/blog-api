let users = []

export default {
    findAll: async () => users,
    findById: async (id) => users.filter(u => u.id === id)[0],
    insert: async (newUser) => users.push(newUser)
}
