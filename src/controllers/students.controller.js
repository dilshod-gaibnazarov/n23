import db from '../db/index.js';

const createStudent = async (req, res) => {
    try {
        const { full_name, group_id } = req.body;
        const [rows] = await db.query('INSERT INTO students (full_name, group_id) VALUES (?, ?)',
            [full_name, group_id]
        );
        const [result] = await db.query('SELECT * FROM students WHERE id = ?', [rows.insertId]);
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
}

export {
    createStudent
}