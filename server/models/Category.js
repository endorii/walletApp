const {Schema, model} = require('mongoose');

const Category = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    label: {type: String, required: true},
    limit: {type: Number, required: true},
    type: {type: String, required: true}
});

module.exports = model("Category", Category);