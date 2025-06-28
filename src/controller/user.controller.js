import { read, write } from '../helpers/file-control.js';

const addUser = async (req, res) => {
    try {
        const users = await read();
        const newUser = {
            id: !users?.length ? 1 : users.at(-1)?.id + 1, ...req.body
        }
        users.push(newUser);
        await write(users);
        return res.status(201).json({
            data: newUser
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const getAllUsers = async (_, res) => {
    try {
        const users = await read();
        return res.status(200).json({
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const getUserById = async (req, res) => {
    try {
        const users = await read();
        const id = +req.params.id;
        const user = users.find(user => user?.id === id);
        if (!user) {
            return res.status(404).json({
                message: 'not found'
            });
        }
        return res.status(200).json({
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const id = +req.params.id;
        const users = await read();
        const index = users.findIndex(user => user.id === id);
        if (index === -1) {
            return res.status(404).json({
                message: 'not found'
            });
        }
        users[index] = { id, ...req.body };
        await write(users);
        return res.status(200).json({
            data: users[index]
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = +req.params.id;
        const users = await read();
        const index = users.findIndex(user => user.id === id);
        if (index === -1) {
            return res.status(404).json({
                message: 'not found'
            });
        }
        users.splice(index, 1);
        await write(users);
        return res.status(200).json({
            data: {}
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}


export {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
}