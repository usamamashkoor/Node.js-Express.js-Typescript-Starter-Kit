import mongoose, { Schema } from 'mongoose';
import { IConstellationModel } from '../interfaces/ConstellationInterface';


const ConstellationsSchema: Schema = new Schema(
    {
        name: { type: String, required: true, index: true,unique:true  },
        abbreviation: { type: String, required: true },
        coordinates: { type: String, required: true },
    }
    , { timestamps: true });

export default mongoose.model<IConstellationModel>('Constellations', ConstellationsSchema);