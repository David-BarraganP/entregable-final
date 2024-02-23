const request = require("supertest")
const app = require('../app')

const BASE_URL = '/users'
let TOKEN 
let userId

const user = {
    firstName: 'Alejandro',
    lastName: 'Barragan',
    email: 'alejandro@gmail.com',
    password: 'alejandro1234',
    phone: '+573506864396'
}


beforeAll(async()=>{
    const user = {
        email: "jose@gmail.com",
        password: "jose1234",
    }

    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)

    TOKEN = res.body.token
})




test("Get -> 'BASE_URL/users', should return status code 200, res.body to be defined and res.body.length === 1", async () => {
    const res = await request(app)

        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)



    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})


test("Post -> 'BASE_URL', should return status code 201, and res.body to be defined and res.body.firstName === user.firstName", async () => {
    const res = await request(app)

        .post(BASE_URL)
        .send(user)

    userId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
})

test("Put -> 'BASE_URL/:id', should return status code 200, res.body to be defined  and res.body.firstName === 'Daniela'", async () => {
    const res = await request(app)
        .put(`${BASE_URL}/${userId}`)
        .send({
            firstName: "Daniela"
        })
        .set('Authorization', `Bearer ${TOKEN}`)


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe("Daniela")
})

test("Post -> 'BASE_URL/login', should return status code 200, and res.body to be defined and res.body.email === user.email,  res.body.token to be denined", async () => {

    const userLogin = {
        email: 'alejandro@gmail.com',
        password: 'alejandro1234'
    }

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(userLogin)


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user.email).toBe(userLogin.email)
    expect(res.body.token).toBeDefined()
})


test("POST -> 'URL_BASE/login', should return status code 401", async () => {
    const userLogin = {
      email: 'alejandro@gmail.com',
      password: 'invalid password'
    }
  
    const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send(userLogin)
  
    expect(res.statusCode).toBe(401)
  })

  test("Delete -> 'URL_BASE/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${userId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      
    expect(res.statusCode).toBe(204)
  })








