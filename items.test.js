const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");

const item = {name: "pickles", price: 2.25};

beforeEach(function(){
    db.items.push(item);
})

/** Get /items returns json of all items */
describe("GET /items", function(){
    it("gets list of grocery items", async function(){
        const resp = await request(app).get(`/items`);

        expect(resp.body).toEqual({"items":[item]});
    })
    
    
})

describe("GET /items/:name", function(){
    it("responds with a 400 if not found", async function(){
        const resp = await request(app).get(`/items/food`);
        expect(resp.statusCode).toEqual(400);   
    })

    it("returns data about item at name", async function(){
        const resp = await request(app).get(`/items/${item.name}`);
        expect(resp.body).toEqual(item);


    })
})

describe("POST /items", function(){

    it("returns added data about new item ", async function(){
        const resp = await request(app)
        .post(`/items/`)
        .send({
            name:"honey",
            price:3.50

        });
        expect(resp.body).toEqual({added:{
            name:"honey",
            price:3.50}});
    })

    it("returns 400 if request bodey is empty", async function(){
        const resp = await request(app)
        .post(`/items/`)
        .send();
        expect(resp.statusCode).toEqual(400);

    })
})




