const request = require("supertest")
const app = require('../app')


const BASE_URL = '/categories'
const BASE_URL_USERS = '/users'

let categoryId
let TOKEN


const category = {
    name: 'electronica'
}

beforeAll(async()=>{
    const user = {
        email: 'jose@gmail.com',
        password: 'jose1234'
    }

    const res = await request(app)
    .post(`${BASE_URL_USERS}/login`)
    .send(user)

    TOKEN = res.body.token
})




test("Post -> 'BASE_URL', should return status code 201, and res.body to be defined and res.body.name = category.name", async () => {
    const res = await request(app)

        .post(BASE_URL)
        .send(category)
        .set('Authorization', `Bearer ${TOKEN}`)

    categoryId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
})

test("Get -> 'BASE_URL/categories', should return status code 200, res.body to be defined and res.body.length === 1", async () => {
    const res = await request(app)

        .get(BASE_URL)
       
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("Delete -> 'URL_BASE/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${categoryId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      
    expect(res.statusCode).toBe(204)
  })

  