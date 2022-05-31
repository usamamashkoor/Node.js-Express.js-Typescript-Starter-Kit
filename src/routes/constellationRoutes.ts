import { Router } from 'express';

import { createConstellation, getConstellations, getConstellation, updateConstellation, deleteConstellation } from '../controllers/ConstellationController';
import ConstellationsValidatorMiddleware from '../middlewares/constellations/ConstellationsValidatorMiddleware';

const router = Router();

router.post('/', [ConstellationsValidatorMiddleware.validate('createConstellation')] ,createConstellation);

router.get('/', getConstellations);

router.get('/:id', [ConstellationsValidatorMiddleware.validate('getConstellation')], getConstellation);

router.patch('/:id', [ConstellationsValidatorMiddleware.validate('updateConstellation')], updateConstellation);

router.delete('/:id', [ConstellationsValidatorMiddleware.validate('deleteConstellation')], deleteConstellation);

export default router;