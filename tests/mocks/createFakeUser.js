import { faker } from '@faker-js/faker'

export default function createFakeUser() {
    return {
        _id: faker.database.mongodbObjectId(),
        fname: faker.person.firstName(),
        lname: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        photo: faker.internet.avatar(),
        socialLinks: {
            facebook: '',
            instagram: '',
            twitter: '',
            linkedIn: '',
        },
        blogs: Array.from({ length: 3 }, faker.database.mongodbObjectId), 
        writingCategories: [],
        bio: faker.lorem.paragraph(30)
    }
}
