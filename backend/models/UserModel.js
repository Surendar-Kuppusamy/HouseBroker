import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name:  {
        type: String,
        trim: true,
        required: [true, 'First Name required.']
    },
    last_name:  {
        type: String,
        trim: true
    },
    dob:  {
        type: Date,
        trim: true
    },
    email:  {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Email required.'],
        validate: {
            validator: function(value) {
                return new Promise((resolve, reject) => {
                    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    resolve(email_pattern.test(value));
                });
            },
            message: props => `${props.value} is not a valid emial!`
        }
    },
    password:  {
        type: String,
        trim: true,
        required: [true, 'Password required.']
    },
    mobile_number:  {
        type: Number,
        required: [true, 'Mobile number required.'],
        validate: {
            validator: function(value) {
                return new Promise((resolve, reject) => {
                    if(value.toString().length != 10) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                });
            },
            message: 'Mobile number must be 10 digits.'
        }
    },
    telephone_number:  {
        type: String
    },
    std_code: {
        type: String
    },
    address: {
        type: String,
        trim: true,
        required: [true, 'Address is required.']
    },
	profile_image: {
        type: String,
        trim: true
    },
    user_type: {        //user_type(1 - Admin, 2 - house owner, 3 - tenant)
        type: Number,
        required: [true, 'User type required.'],
        enum: {
            values: [1, 2, 3],
            message: '{VALUE} is invalid type.'
        }
    },
    user_status: {        //user_status (1 - active, 2 - disabled)
        type: Number,
        required: [true, 'User status required.'],
        enum: {
            values: [1, 2],
            message: '{VALUE} is invalid status.'
        }
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    modified_on: {
        type: Date,
        default: Date.now
    }
})

const Users = mongoose.model("Users", UserSchema);
export default Users;