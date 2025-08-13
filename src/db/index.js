import { Pool } from "pg";

const pg = new Pool({
    connectionString: 'postgres://postgres:1421@localhost:5432/n23'
});

export default pg;
