import request from "supertest";
 
import app from '../index'

describe('homepage', () => {
    it('alow user to register', async () => {
      const res:any = await request(app)
        .post('/users/signup')
        .send({
            firstname: "Odin",
            lastname: "Chieftain",
            username: "odin@valhalla.org",
            email: "odin@valhalla.org",
            password: "Theancient1" 
        })
      expect(res['statusCode']).toEqual(200)
    })
  })

describe('login', () => {
  it('alow user to register', async () => {
    const res:any = await request(app)
      .post('/users/login')
      .send({
          username: "odin@valhalla.org",
          password: "Theancient1" 
      })
    expect(res['statusCode']).toEqual(200)
  })
})