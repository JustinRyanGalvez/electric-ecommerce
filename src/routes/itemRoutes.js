import express from 'express';
import db from '../db.js'

const router = express.Router();

router.get('/', (req, res) => {
    const role = "customer"
    if (role === "customer") {
        const items = db.prepare(`SELECT * FROM item_data WHERE qty >=1 `).all();
        res.json(items);
    }
    else if (role === "employee") {
        const items = db.prepare(`SELECT * FROM item_data`).all()
        res.json(items);
    }
    else {
        res.status(401).json({error:"Unauthorized"})
    }
});

export default router;