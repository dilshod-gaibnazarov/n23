import { Router } from "express";
import { CountryController } from "../controllers/country.controller.js";

const router = Router();
const controller = new CountryController();

router
    .post('/', controller.createCountry)
    .get('/', controller.getAllCountries)
    .get('/:id', controller.getCountryById)
    .patch('/:id', controller.updateCountry)
    .delete('/:id', controller.deleteCountry)

export default router;
