import mongoose from 'mongoose'

class DBManager {
    static async Connect(url) {
        await mongoose.connect(url)
        console.log('Connected to database')
    }
    static async Disconnect() {
        await mongoose.disconnect()
        console.log('Disconnected from database')
    }
}

export default DBManager
