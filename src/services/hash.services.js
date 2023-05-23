import bcrypt from 'bcryptjs'

class HashingServices {
    static async Hash(string) {
        const hashedString = await bcrypt.hash(string, 12)
        return hashedString
    }

    static async Compare(hash, string) {
        const res = await bcrypt.compare(hash, string)
        return res
    }
}

export default HashingServices

