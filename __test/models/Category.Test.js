const Category = require('../../models/Category');
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

describe('Test of Category Schema', () => {
    test('Should create a new category', () => {
        return Category.create({
            name: 'Xianxia'
        }).then((response) => {
            expect(response.name).toBe('Xianxia')
        })
    })
    test('Should update the category', () => {
        return Category.findOne({ 'name': 'Xianxia' })
            .then((cat) => {
                cat.name = 'Fantasy'
                cat.save().then((updatedCat) => {
                    expect(updatedCat.name).toBe('Fantasy')
                })
            })
    })
    test('Should delete the category', () => {
        return Category.findOneAndDelete({ 'name': 'Fantasy' })
            .then((response) => {
                expect(response.name).toBe('Fantasy')
            })
    })
})