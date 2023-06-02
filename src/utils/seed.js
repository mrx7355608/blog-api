import 'dotenv/config';
import mongoose from 'mongoose';
import config from '../../config/index.js';
import BlogModel from '../models/blog.model.js';
import createFakeUser from '../../tests/mocks/createFakeUser.js';
import UserModel from '../models/user.model.js';
import { faker } from '@faker-js/faker';

// CONNECT TO DATABASE
async function connect() {
    await mongoose.connect('');


    console.log('Connected to database');
}

// DISCONNECT FROM DATABASE
async function disconnect() {
    await mongoose.disconnect();
    console.log('Disconnected from database');
}

// ----------------------------
// ### BLOGS OPERATIONS ###
// ----------------------------

class BlogOperations {
    constructor() {}

    createFakeBlog(fakeUserId) {
        return {
            title: faker.lorem.sentence(20),
            body: faker.lorem.paragraph(),
            author: fakeUserId,
            tags: ['Tech', 'Sports', 'Movies'],
            coverPhoto: faker.internet.avatar(),
            slug: faker.lorem.slug(),
        };
    }

    // Add fake blogs in database
    async addFakeBlogsInDB(fakeUserIds) {
        const fakeBlogs = [];
        console.log({ fakeUserIds })

        for (let i = 0; i < 10; i++) {
            const fakeBlog = this.createFakeBlog(fakeUserIds[i]);
            fakeBlogs.push(fakeBlog);
        }

        await BlogModel.insertMany(fakeBlogs);
        console.log('New blogs added');
    }

    // DELETE EVERY DOCUMENT IN COLLECTION
    async deleteAllBlogs() {
        await BlogModel.deleteMany();
        console.log('All documents deleted');
    }
}

// ----------------------------
// ### USERS OPERATIONS ###
// ----------------------------

class UserOperations {
    constructor() {}

    async addFakeUsers() {
        const fakeUsers = [];

        // Create an array of fake users
        for (let i = 0; i < 10; i++) {
            const fakeUser = createFakeUser();
            fakeUsers.push(fakeUser);
        }

        // Add fake users in database
        const users = await UserModel.insertMany(fakeUsers);
        console.log('Fake users created');

        return users;
    }

    // DELETE EVERY DOCUMENT IN USERS COLLECTION
    async deleteAllUsers() {
        await UserModel.deleteMany();
        console.log('All user documents deleted');
    }
}

const action = process.argv[2];
const collection = process.argv[3];

const userOperations = new UserOperations();
const blogOperations = new BlogOperations();

console.log(config);
connect();

if (action === 'deleteAll' && collection === 'blogs') {
    blogOperations.deleteAllBlogs();
} else if (action === 'add' && collection === 'blogs') {
    userOperations.addFakeUsers().then((fakeUsers) => {
        const fakeUserIds = fakeUsers.map((user) => user._id);
        blogOperations.addFakeBlogsInDB(fakeUserIds).then(resp => {
            console.log(resp)
        })
    });
} else if (action === 'deleteAll' && collection === 'users') {
    userOperations.deleteAllUsers();
} else {
    console.log('Invalid / No aruments were supplied');
}
