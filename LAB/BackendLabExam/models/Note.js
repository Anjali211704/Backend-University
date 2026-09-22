const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000
        },

        category: {
            type: String,
            trim: true,
            default: "General"
        }
    },
    {
        timestamps: true,
        collection: "notes"
    }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;