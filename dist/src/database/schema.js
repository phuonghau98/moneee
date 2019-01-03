"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.RecordSchema = new mongoose.Schema({
    belongsTo: String,
    tag: String,
    date: String,
    method: String,
    description: [{
            content: String,
            date: String
        }],
    amount: Number
});
exports.UserSchema = new mongoose.Schema({
    name: String,
    usn: String,
    pwd: String,
    accounts: {
        bank: Number,
        cc: Number,
        cash: Number
    }
});
//# sourceMappingURL=schema.js.map