import { isValidObjectId } from 'mongoose';
import City from '../models/city.model.js';

export class CityController {
    async createCity(req, res) {
        try {
            const newCity = await City.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: newCity
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async getAllCities(_, res) {
        try {
            const cities = await City.find().populate('country');
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: cities
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async getCityById(req, res) {
        try {
            const id = req.params?.id;
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Invalid ObjectId'
                });
            }
            const city = await City.findById(id).populate('country');
            if (!city) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'City not found'
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: city
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async updateCity(req, res) {
        try {
            const id = req.params?.id;
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Invalid ObjectId'
                });
            }
            const updatedCity = await City.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedCity) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'City not found'
                });
            }
            const city = await City.findById(id).populate('country');
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: city
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async deleteCity(req, res) {
        try {
            const id = req.params?.id;
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Invalid ObjectId'
                });
            }
            const city = await City.findByIdAndDelete(id);
            if (!city) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'City not found'
                });
            }
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