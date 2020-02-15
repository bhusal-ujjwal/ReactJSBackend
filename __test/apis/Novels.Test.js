const axios = require('axios');
const baseurl = 'http://localhost:3001/novel';

describe('novelAPI', () => {
    let novel;
    test('Post a novel', async () => {
        let cat = await axios.post(baseurl, {
            'name': 'Legend of the dragon king'
        })
        expect(cat.data.name).toBe('Legend of the dragon king')
    })

    test('Get all novel', async () => {
        return axios.get(baseurl)
            .then((response) => {
                novel = response.data;
                expect(response.data.length).toBeGreaterThan(0);
            })
    })

    test('Find a novel by id', async () => {
        return axios.get(baseurl + `/${novel[0]._id}`)
            .then((response) => {
                expect(response.data.name).toBe('Legend of the dragon king');
            })
    })
    test('Update a novel', async () => {
        return axios.put(baseurl + `/${novel[0]._id}`, {
            'name': 'Personal'
        })
            .then((response) => {
                expect(response.data.name).toBe('Personal');
            })
    })
    test('remove all novel', async () => {
        return axios.delete(baseurl)
            .then((response) => {
                expect(200)
            })
    })
})