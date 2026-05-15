import express, {} from "express";
import { Pool } from "pg";
import config from "./config/env";
const app = express();
const port = config.port;
//data format middleware or body parser
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
//connect to Neon DB
const pool = new Pool({
    connectionString: config.connection_string,
});
const initDB = async () => {
    try {
        await pool.query(`
        
CREATE TABLE IF NOT EXISTS users(
id SERIAL PRIMARY KEY,
name VARCHAR(40),
email VARCHAR(40) UNIQUE NOT NULL,
password VARCHAR(40) NOT NULL,
is_active BOOLEAN DEFAULT true,
age INT,

created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()

)
        `);
        console.log("DB Connected Successfully");
    }
    catch (error) {
        console.log(error);
    }
};
initDB();
app.get("/", (req, res) => {
    res.status(200).json({
        message: "ecpress server",
        author: "Next Level",
    });
});
app.post("/api/users", async (req, res) => {
    const { name, email, password, age } = req.body;
    try {
        const result = await pool.query(`
    INSERT INTO users(name,email,password,age)
    VALUES($1,$2,$3,$4) RETURNING *
    `, [name, email, password, age]);
        res.status(201).json({
            success: true,
            message: "User Created",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
});
app.get("/api/users", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM users 
            `);
        res.status(200).json({
            success: true,
            message: "Users Retrived Successfuly",
            data: result.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error,
        });
    }
});
app.get("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
            SELECT * FROM users WHERE id =$1
            `, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Users Not Found",
                data: {},
            });
        }
        res.status(200).json({
            success: true,
            message: "Users Retrived Successfuly",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error,
        });
    }
});
app.put("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, password, age, is_active } = req.body;
    try {
        const result = await pool.query(`
            UPDATE users 
            SET 
            name=COALESCE($1,name),
            password=COALESCE($2,password),
            age=COALESCE($3,age),
            is_active=COALESCE($4,is_active)
            WHERE id=$5 RETURNING *
            `, [name, password, age, is_active, id]);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Users Not Found",
                data: {},
            });
        }
        res.status(200).json({
            success: true,
            message: "Users Updated Successfuly",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error,
        });
    }
});
app.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(` DELETE FROM users WHERE id =$1
            `, [id]);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "Users Not Found",
                data: {},
            });
        }
        res.status(200).json({
            success: true,
            message: "Users Deleted Successfuly",
            data: {},
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error,
        });
    }
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//# sourceMappingURL=server.js.map