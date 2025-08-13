import pg from '../db/index.js';

export class DBService {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async createDB(body) {
        const columns = Object.keys(body).join(', ');
        let values = '';
        const keys = Object.keys(body);
        for (let i = 1; i <= keys.length; i++) {
            if (i == keys.length) {
                values += `$${i}`;
            } else {
                values += `$${i}, `;
            }
        }
        let query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${values}) RETURNING *`;
        const { rows } = await pg.query(query, Object.values(body));
        return rows[0];
    }

    async findAllDB(options = 'ORDER BY ID ASC') {
        const { rows } = await pg.query(`SELECT * FROM ${this.tableName} ${options}`);
        return rows;
    }

    async findByIdDB(id) {
        const { rows } = await pg.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
        return rows[0];
    }

    async findOneDB(filter) {
        const { rows } = await pg.query(`SELECT * FROM ${this.tableName} WHERE ${filter?.column} = $1`, [filter?.row]);
        return rows[0];
    }

    async updateDB(id, body) {
        let columns = Object.keys(body);
        let keys = '';
        for (let i = 0; i < columns.length; i++) {
            if (i == columns.length - 1) {
                keys += `${columns[i]} = $${i + 1}`;
            } else {
                keys += `${columns[i]} = $${i + 1}, `;
            }
        }
        let query = `UPDATE ${this.tableName} SET ${keys} WHERE id = $${columns.length + 1} RETURNING *`;
        const { rows } = await pg.query(query, [...Object.values(body), id]);
        return rows[0];
    }

    async removeDB(id) {
        const { rows } = await pg.query(`DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`, [id]);
        return rows[0];
    }
}
