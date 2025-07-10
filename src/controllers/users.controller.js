import { db } from '../db/index.js';
import { ObjectId } from 'mongodb';

const createUser = async (req, res) => {
    try {
        const result = await db.collection('users').insertOne(req.body);
        const user = await db.collection('users').findOne({ _id: new ObjectId(result.insertedId) });
        return res.status(201).json({
            statusCode: 201,
            message: 'success',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message || 'Internal server error'
        });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await db.collection('users').find().toArray();
        return res.status(200).json({
            statusCode: 200,
            message: 'success',
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message || 'Internal server error'
        });
    }
}

const getUserById = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const user = await db.collection('users').findOne({ _id: id });
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                message: 'User not found'
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: 'success',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message || 'Internal server error'
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const result = await db.collection('users').updateOne({ _id: id }, {
            $set: { ...req.body }
        });
        if (result.matchedCount === 0) {
            return res.status(404).json({
                statusCode: 404,
                message: 'User not found'
            });
        }
        const user = await db.collection('users').findOne({ _id: id });
        return res.status(200).json({
            statusCode: 200,
            message: 'success',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message || 'Internal server error'
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const result = await db.collection('users').deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({
                statusCode: 404,
                message: 'User not found'
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

export {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}