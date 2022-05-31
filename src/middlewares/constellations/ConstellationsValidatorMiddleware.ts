import { check, param } from 'express-validator';
import { IConstellationsValidatorMiddleware } from '../../interfaces/ConstellationInterface';
const ConstellationsValidatorMiddleware:IConstellationsValidatorMiddleware = {
    validate : (method:any) => {
        switch (method) {
            case 'createConstellation': {
                return [
                    check('name', 'Name is required').exists().escape().trim().notEmpty(),
                    check('abbreviation', 'Abbreviation is required').exists().escape().trim().notEmpty(),
                    check('coordinates', 'Coordinates is required').exists().escape().trim().notEmpty(),
                ]
            }
            case 'updateConstellation': {
                return [
                    param('id', 'id is required').exists().escape().trim().notEmpty(),
                    check('name', 'Name is required').exists().escape().trim().notEmpty(),
                    check('abbreviation', 'Abbreviation is required').exists().escape().trim().notEmpty(),
                    check('coordinates', 'Coordinates is required').exists().escape().trim().notEmpty(),
                ]
            }
            case 'deleteConstellation': {
                return [
                    param('id', 'id is required').exists().escape().trim().notEmpty(),
                ]
            }
            case 'getConstellation': {
                return [
                    param('id', 'id is required').exists().escape().trim().notEmpty(),
                ]
            }
        }
    }
};


export default ConstellationsValidatorMiddleware;
