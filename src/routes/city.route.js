import { Router } from "express";
import { CityController } from '../controllers/city.controller.js';

const router = Router();
const controller = new CityController();

router
    .post('/', controller.createCity)
    .get('/', controller.getAllCities)
    .get('/:id', controller.getCityById)
    .patch('/:id', controller.updateCity)
    .delete('/:id', controller.deleteCity)

export default router;
