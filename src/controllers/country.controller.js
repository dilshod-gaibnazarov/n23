import Country from '../models/country.model.js';
import { isValidObjectId } from 'mongoose';

export class CountryController {
    async createCountry(req, res) {
        try {
            const existsCountry = await Country.findOne({ name: req.body?.name });
            if (existsCountry) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'Country already added'
                });
            }
            const newCountry = await Country.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: newCountry
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async getAllCountries(_, res) {
        try {
            const countries = await Country.find();
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: countries
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async getCountryById(req, res) {
        try {
            const id = req.params?.id;
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Invalid ObjectId'
                });
            }
            const country = await Country.findById(id);
            if (!country) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Country not found'
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: country
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async updateCountry(req, res) {
        try {
            const id = req.params?.id;
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Invalid ObjectId'
                });
            }
            const country = await Country.findById(id);
            if (!country) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Country not found'
                });
            }
            const updatedCountry = await Country.findByIdAndUpdate(id, req.body, { new: true });
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: updatedCountry
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async deleteCountry(req, res) {
        try {
            const id = req.params?.id;
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Invalid ObjectId'
                });
            }
            const country = await Country.findById(id);
            if (!country) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Country not found'
                });
            }
            await Country.findByIdAndDelete(id);
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }
}