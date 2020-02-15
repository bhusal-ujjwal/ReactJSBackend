const users = require('../../models/users');
const mongoose = require('mongoose');
const testDB = 'mongodb://localhost:27017/abcfinal'

beforeAll(async () => {
    await mongoose.connect(testDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
})

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
})

describe('Test of users Schema', () => {
    test('Should create a new users', () => {
        return users.create({
            name: 'ujjwal1142'
        }).then((response) => {
            expect(response.name).toBe('ujjwal1142')
        })
    })
    test('Should update the users', () => {
        return users.findOne({ 'name': 'ujjwal1142' })
            .then((cat) => {
                cat.name = 'bhusal'
                cat.save().then((updatedCat) => {
                    expect(updatedCat.name).toBe('bhusal')
                })
            })
    })
    test('Should delete the users', () => {
        return users.findOneAndDelete({ 'name': 'bhusal' })
            .then((response) => {
                expect(response.name).toBe('bhusal')
            })
    })
})