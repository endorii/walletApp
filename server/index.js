const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./routes/auth.rotes');
const categoriesRouter = require('./routes/categories.rotes');
const transactionsRouter = require('./routes/transactions.rotes');
const app = express();
const cors = require('cors');
const PORT = config.get('serverPort');

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/", categoriesRouter);
app.use("/api/", transactionsRouter);


const start = async () => {
    try {
        mongoose.connect(config.get("dbUrl"));

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT);
        })
    } catch (e) {
        console.log(e);
    }
}

start();