const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

// ...Make user and project a mongoose objectId type --where it's going to take data from the user(usernames) and projects...
// ...Make user an array of strings as well...
const projectSchema = new mongoose.Schema(
    {
        tag: {
            type: String,
            required: true
        },
        users: {
            type: [Object],
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true
        },
        sections: {
            type: [Object],
            required: true
        },
        fields: {
            type: [Object],
            required: true
        }
    }
)

module.exports = mongoose.model('Project', projectSchema);