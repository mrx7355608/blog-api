import bcrypt from 'bcryptjs'

export default function HashingServices {
    // HASHES PASSWORD
    async function hash(string) {
        const hashedString = await bcrypt.hash(string, 12)
        return hashedString
    }

    // VERIFIES THE PASSWORD
    async function compare(hash, string) {
        const res = await bcrypt.compare(hash, string)
        return res
    }

    return { hash, compare }
}

export default HashingServices

