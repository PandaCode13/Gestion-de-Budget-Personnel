const pg = require("pg");

const userSchema = new pg.Schema(
    {
        firstName : {
            type: String,
            required: true
        },
        lastName : {
            type: String,
            required: true
        },
        email : {
            type: String,
            required: true
        },
        password : {
            type: String,
            required: true
        },
        avatar : {
            type: String
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        isActive : {
            type: Boolean,
            default: true
        },
        
    }
);