const { Schema, model } = require('mongoose');

const Transaction = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: {type: String, required: true},
    value: {type: Number, required: true},
    category: {type: String, required: true},
    date: {type: String, required: true}
});

module.exports = model("Transaction", Transaction);