require('../models')
const request = require('supertest')
const app = require('../app')
const supertest = require('supertest')
const Product = require('../models/Product')

const BASE_URL = '/purchase'
const BASE_URL_USERS = '/users/login'

let TOKEN
let userId
let product
let productBody
let bodyCart


beforeAll(async()=>{

    // inicio de sesion
    const user = {
        email: 'jose@gmail.com',
        password: 'jose1234'
    }

    const res = await supertest(app)
    .post(BASE_URL_USERS)
    .send(user)

    TOKEN = res.body.token
    userId = res.body.user.id


    // producto
    productBody = {
        title: 'lorem10',
        description: 'lorem30',
        price:99.9
    }

    product = await Product.create(productBody)

    // cart
    bodyCart = {
        productId: product.id,
        quantity:3
    }

    await supertest(app)
    .post('/cart')
    .send(bodyCart)
    .set('Authorization', `Bearer ${TOKEN}`)

})

test("Post -> 'BASE_URL', should return status code 201, and res.body to be defined and res.body.quantity === bodyCart.quantity", async () => {
    const res = await supertest(app)

        .post(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

        

    expect(res.statusCode).toBe(201)
    expect(res.body[0]).toBeDefined()
    expect(res.body[0].quantity).toBe(bodyCart.quantity)
})

test("Get -> 'BASE_URL/purechase', should return status code 200, res.body to be defined and res.body.length === 1", async () => {
    const res = await supertest(app)

        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)
       
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].productId).toBeDefined()
    expect(res.body[0].productId).toBe(product.id)

    expect(res.body[0].userId).toBeDefined()
    expect(res.body[0].userId).toBe(userId)

    await product.destroy()
})