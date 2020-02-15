const axios = require('axios');
const baseurl = 'http://localhost:3001/novelcategory';

describe('novelcategoryAPI', () => {
    let novelcategory;
    test('Post a novelcategory', async () => {
        let cat = await axios.post(baseurl, {
            'name': 'Home'
        })
        expect(cat.data.name).toBe('Home')
    })

    test('Get all novelcategory', async () => {
        return axios.get(baseurl)
            .then((response) => {
                novelcategory = response.data;
                expect(response.data.length).toBeGreaterThan(0);
            })
    })

    test('Find a novelcategory by id', async () => {
        return axios.get(baseurl + `/${novelcategory[0]._id}`)
            .then((response) => {
                expect(response.data.name).toBe('Home');
            })
    })
    test('Update a novelcategory', async () => {
        return axios.put(baseurl + `/${novelcategory[0]._id}`, {
            'name': 'Personal'
        })
            .then((response) => {
                expect(response.data.name).toBe('Personal');
            })
    })
    test('remove all novelcategory', async () => {
        return axios.delete(baseurl)
            .then((response) => {
                expect(200)
            })
    })
})