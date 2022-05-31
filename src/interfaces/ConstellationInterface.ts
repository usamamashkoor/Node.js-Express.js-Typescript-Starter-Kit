import { Document } from 'mongoose';

export interface IConstellation {
    name: string;
    abbreviation: string;
    coordinates: string;
}

export interface IConstellationModel extends IConstellation, Document {}


export interface IConstellationsValidatorMiddleware {
    validate: Function;
}