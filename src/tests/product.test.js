require('../models')
const request = require("supertest")
const app = require('../app')


const BASE_URL = '/products'
const BASE_URL_USERS = '/users'



let productId
let TOKEN

const product = {
    title: "Ciclas",
     description: "lorem20",
     price: "1000000"
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


   test("Post -> 'BASE_URL', should return status code 201, and res.body to be defined and res.body.title = product.title", async () => {
    const res = await request(app)

        .post(BASE_URL)
        .send(product)
        .set('Authorization', `Bearer ${TOKEN}`)

        productId = res.body.id

 

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
})

test("Get -> 'BASE_URL/products', should return status code 200, res.body to be defined and res.body.length === 1", async () => {
    const res = await request(app)

        .get(BASE_URL)
       
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("Get -> 'BASE_URL/:id', should return status code 200, res.body to be defined and res.body.title = product.title", async () => {
    const res = await request(app)
    
    .get(`${BASE_URL}/${productId}`)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)

})

test("Put -> 'BASE_URL/:id', should return status code 200, res.body to be defined  and res.body.title = 'Guayos'", async () => {
    const res = await request(app)
        .put(`${BASE_URL}/${productId}`)
        .send({
            title: "Guayos"
        })
        .set('Authorization', `Bearer ${TOKEN}`)


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe("Guayos")
})

test("Delete -> 'URL_BASE/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${productId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      
    expect(res.statusCode).toBe(204)
  })


