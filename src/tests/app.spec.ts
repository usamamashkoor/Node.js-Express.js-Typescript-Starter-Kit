import request from "supertest";
import { Express } from 'express-serve-static-core';
import {MongoMemoryServer} from 'mongodb-memory-server';
import {connect, disconnect, connection} from 'mongoose';
import mongoose from 'mongoose';
import Constellations from '../models/Constellations'
import app from "../app"

let server: Express
let name: String = `${Date.now()}-${Math.floor(Math.random() * 1072728267)}-test-name`;
let constellation_id: any;

const SECONDS = 1000;
// jest.setTimeout(50 * SECONDS)

describe('Tests for the whole application', () => {
    beforeAll( async () => {
        server = app;
        
        let objConstellation = new Constellations({
            name,
            abbreviation:'abbreviation',
            coordinates:'coordinates',
        });
        objConstellation = await objConstellation.save();
        constellation_id = objConstellation._id
        // const mongoServer = await MongoMemoryServer.create();
        // await mongoose.connect(mongoServer.getUri())
    });

    afterAll(async() => {
        // await mongoose.disconnect();
        // await mongoose.connection.close();
    })
    // describe('App should say hello world', () => {
    //     it('should return 200', (done) => {
    //         request(server)
    //             .get('/')
    //             .expect(200)
    //             .end((err, res) => {
    //                 if (err) return done(err)
    //                 expect(res.body).toMatchObject({ 'message': `Hello World!` })
    //                 done()
    //             })
    //     });
    // })

    describe('get all products route', () => {
        it('get all produtcs', (done) => {
            request(server)
                .get('/api/constellation')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    // console.log('res.body')
                    // console.log('res.body')
                    // console.log('res.body')
                    // console.log(res.body)
                    // console.log('res.body.objConstellations.length')
                    // console.log('res.body.objConstellations.length')
                    // console.log('res.body.objConstellations.length')
                    // console.log(res.body.objConstellations.length)
                    expect(res.body.objConstellations.length).toBeGreaterThanOrEqual(1);
                    done()
                })
        });
    })

    describe('Find product by id route', () => {
        it('Find product by id', (done) => {
            request(server)
                .get(`/api/constellation/${constellation_id}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    // console.log('res.body')
                    // console.log('res.body')
                    // console.log('res.body')
                    // console.log(res.body)
                    // console.log('res.body.objConstellation')
                    // console.log('res.body.objConstellation')
                    // console.log('res.body.objConstellation')
                    // console.log(res.body.objConstellation)
                    // console.log('res.body.objConstellation._id')
                    // console.log('res.body.objConstellation._id')
                    // console.log('res.body.objConstellation._id')
                    // console.log(res.body.objConstellation._id)
                    expect(res.body.objConstellation._id.toString()).toEqual(constellation_id.toString());
                    done()
                })
        });
    })

    describe('create new product route', () => {
        let c_name: String = `${Date.now()}${Date.now()}-${Math.floor(Math.random() * 1072728267)}-test-name`;
        it('create new product', (done) => {
            request(server)
                .post('/api/constellation')
                .send({
                    name:c_name,
                    abbreviation:'abbreviation-test',
                    coordinates:'coordinates-test',
                })
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err)
                    // console.log('res.body')
                    // console.log('res.body')
                    // console.log('res.body')
                    // console.log(res.body)
                    // console.log('res.body.objConstellations.length')
                    // console.log('res.body.objConstellations.length')
                    // console.log('res.body.objConstellations.length')
                    // console.log(res.body.objConstellations.length)
                    expect(res.body.objConstellationNew.name).toEqual(c_name);
                    done()
                })
        });
    })

    describe('update product route', () => {
        let c_up_name: String = `${Date.now()}${Date.now()}-${Math.floor(Math.random() * 1072728267)}-test-name`;
        it('update product', (done) => {
            request(server)
                .patch(`/api/constellation/${constellation_id}`)
                .send({
                    name:c_up_name,
                    abbreviation:'abbreviation-test-test',
                    coordinates:'coordinates-test-test',
                })
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err)
                    // console.log('res.body')
                    // console.log('res.body')
                    // console.log('res.body')
                    // console.log(res.body)
                    // console.log('res.body.objConstellations.length')
                    // console.log('res.body.objConstellations.length')
                    // console.log('res.body.objConstellations.length')
                    // console.log(res.body.objConstellations.length)
                    expect(res.body.objConstellationUpdated.name).toEqual(c_up_name);
                    done()
                })
        });
    })
});