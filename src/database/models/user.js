import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please provide a first name"],
        },
        lastName: {
            type: String,
            required: [true, "Please provide a last name"],
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
        },
        contact: {
            type: String,
            required: [true, "Please provide a contact"],
            unique: true,
        },
        dob: {
            type: Date,
            required: [true, "Please provide a date of birth"],
        },
        gender: {
            type: String,
            required: [true, "Please provide a gender"],
        },
        password: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        referralId: {
            type: String,
            unique: true,
            default: function () {
                return 'RJR-' + crypto.randomBytes(9).toString('base64').replace(/\+/g, '0').replace(/\//g, '0').substring(0, 12);
            },
        },
        referredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        referrals: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
    {
        timestamps: true
    }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.post("save", async function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000 && error.keyPattern && error.keyPattern.referralId) {
        let success = false;
        let attempts = 0;
        while (!success && attempts < 5) {
            this.referralId = 'RJR-' + crypto.randomBytes(9).toString('base64').replace(/\+/g, '0').replace(/\//g, '0').substring(0, 12);
            try {
                await this.save();
                success = true;
            } catch (error) {
                if (error.name === 'MongoError' && error.code === 11000 && error.keyPattern && error.keyPattern.referralId) {
                    attempts++;
                } else {
                    next(error);
                    return;
                }
            }
        }
        if (!success) {
            next(new Error('Failed to generate unique referralId after 5 attempts'));
        }
    } else {
        next(error);
    }
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.models.users || mongoose.model("users", UserSchema);

export default User;