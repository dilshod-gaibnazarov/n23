import db from "../db/index.js";

const createGroup = async (req, res) => {
    try {
        const [rows] = await db.query('INSERT INTO `groups` (name) VALUES (?)', [req.body.name]);
        const [result] = await db.query('SELECT * FROM `groups` WHERE id = ?', [rows.insertId]);
        return res.status(201).json({
            statusCode: 201,
            message: 'success',
            data: result[0]
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            error: {
                message: error.message
            }
        });
    }
};

const getAllGroups = async (req, res) => {
    try {
        const [groups] = await db.query('SELECT * FROM `groups`');
        const [students] = await db.query('SELECT * FROM students');
        const result = groups.map(group => {
            return {
                id: group.id,
                name: group.name,
                students: students.filter(student => student.group_id == group.id)
            }
        });
        return res.status(200).json({
            statusCode: 200,
            message: 'success',
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            error: {
                message: error.message
            }
        });
    }
}

const getGroupById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const [rows] = await db.query('SELECT * FROM `groups` WHERE id = ?', [id]);
        const [students] = await db.query('SELECT * FROM students');
        const group = {
            id: rows[0]?.id,
            name: rows[0]?.name,
            students: students.filter(student => student.group_id == rows[0]?.id)
        };
        if (!rows[0]) {
            return res.status(404).json({
                statusCode: 404,
                error: {
                    message: `Group not found by ID ${id}`
                }
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: 'success',
            data: group
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            error: {
                message: error.message
            }
        });
    }
}

const updateGroup = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const [rows] = await db.query('SELECT * FROM `groups` WHERE id = ?', [id]);
        if (!rows[0]) {
            return res.status(404).json({
                statusCode: 404,
                error: {
                    message: `Group not found by ID ${id}`
                }
            });
        }
        await db.query('UPDATE `groups` SET name = ? WHERE id = ?', [req.body.name, id]);
        const [result] = await db.query('SELECT * FROM `groups` WHERE id = ?', [id]);
        return res.status(200).json({
            statusCode: 200,
            message: 'success',
            data: result[0]
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            error: {
                message: error.message
            }
        });
    }
}

const deleteGroup = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const [rows] = await db.query('SELECT * FROM `groups` WHERE id = ?', [id]);
        if (!rows[0]) {
            return res.status(404).json({
                statusCode: 404,
                error: {
                    message: `Group not found by ID ${id}`
                }
            });
        }
        await db.query('DELETE FROM `groups` WHERE id = ?', [id]);
        return res.status(200).json({
            statusCode: 200,
            message: 'success',
            data: {}
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            error: {
                message: error.message
            }
        });
    }
}

export {
    createGroup,
    getAllGroups,
    getGroupById,
    updateGroup,
    deleteGroup
}