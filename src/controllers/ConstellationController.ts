import { validationResult } from 'express-validator';
import { RequestHandler } from 'express';
import { IConstellation } from '../interfaces/ConstellationInterface';
import Constellations from '../models/Constellations'

export const createConstellation: RequestHandler = async (req, res, next) => {
    // const text = (req.body as { text: string }).text;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('errors.array()')
        console.log(errors.array())
        // return res.status(422).json({ errors: errors.array() });
        return res.json({ error: true, msg: 'Please provide valid form data.' });
    }
    const {
        name, abbreviation,
        coordinates
    } = req.body;
    let isExist = await Constellations.findOne({ name });
    // console.log('isExist')
    // console.log(isExist)
    if (isExist) {
        return res.json({ error: true, msg: 'Constellation already exists.' });
    }
    
    const objConstellation = new Constellations({
        name,
        abbreviation,
        coordinates,
    });
    objConstellation.save(async (err, newObjConstellation) => {
        if (err) return res.json({ error: true, err,msg: 'Error in creating Constellation', });
        return res.status(201).json({
            objConstellationNew: newObjConstellation,
            error: false,
            msg: 'Constellation has been registered successfully',
        })
    })
};

export const getConstellations: RequestHandler = async (req, res, next) => {
    // res.json({ todos: TODOS });
    const objConstellations = await Constellations.find({}).sort({'createdAt':-1}).lean();
    
    return res.json({ objConstellations });
};

export const updateConstellation: RequestHandler = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('errors.array()')
        console.log(errors.array())
        // return res.status(422).json({ errors: errors.array() });
        return res.json({ error: true, msg: 'Please provide valid form data.' });
    }
    const constellationId = req.params.id;
    const {
        name, abbreviation,
        coordinates
    } = req.body;
    let objConstellation = await Constellations.findOne({ _id: constellationId });
    if (!objConstellation) {
        return res.status(404).json({ error: true,message: 'Constellation not found' });
    }
    const objUserConstellationExists = await Constellations.findOne({name,_id:{ $ne: objConstellation._id }}).lean();
    console.log('objUserConstellationExists')
    console.log('objUserConstellationExists')
    console.log(objUserConstellationExists)
    if(objUserConstellationExists){
        return res.status(404).json({ error: true,message: 'Constellation already exists' });
    }
    objConstellation.name = name;
    objConstellation.abbreviation = abbreviation;
    objConstellation.coordinates = coordinates;
    objConstellation.save((err, updatedObjConstellation) => {
        if (err) return res.json({ error: true, err });
        return res.status(201).json({
            error: false,
            msg:'Constellation has been updated successfully',
            objConstellationUpdated:updatedObjConstellation,
        });
    })
};

export const deleteConstellation: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('errors.array()')
        console.log(errors.array())
        // return res.status(422).json({ errors: errors.array() });
        return res.json({ error: true, msg: 'Please provide valid form data.' });
    }
    const constellationId = req.params.id;
    Constellations.deleteOne({ _id: constellationId },
        (err : any, constellationDeletedCount : any) => {
            if (err) return res.json({ error: true, err, msg: 'error in deleting constellation, Please try again.' });
            console.log('constellationDeletedCount in logout')
            console.log('constellationDeletedCount in logout')
            console.log(constellationDeletedCount)
            
            return res.status(201).send({
                error: false,
                msg: 'Deleted successfully',
            })
        }
    )
};


export const getConstellation: RequestHandler = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('errors.array()')
        console.log(errors.array())
        // return res.status(422).json({ errors: errors.array() });
        return res.json({ error: true, msg: 'Please provide valid form data.' });
    }
    const constellationId = req.params.id;
    
    let objConstellation = await Constellations.findOne({ _id: constellationId });
    if (!objConstellation) {
        return res.status(404).json({ error: true,message: 'Constellation not found' });
    }
    
    return res.status(200).json({
        error: false,
        msg:'Constellation has been found successfully',
        objConstellation,
    });
    
};