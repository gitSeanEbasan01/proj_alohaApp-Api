const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

// ...Make user and project a mongoose objectId type --where it's going to take data from the user(usernames) and projects...
// ...Make user an array of strings as well...
const taskSchema = new mongoose.Schema(
    {
        isChecked: {
            type: Boolean,
            required: true,
        },
        usersAssigned: {
            type: [String],
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            require: true
        },
        project: {
            type: String,
            require: false
        },
        section: {
            type: Object,
            require: true
        },
        fields: {
            type: [Object],
            require: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Task', taskSchema);