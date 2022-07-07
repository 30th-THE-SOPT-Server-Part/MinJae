import mongoose from "mongoose";
import { UserInfo } from "../interfaces/user/UserInfo";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  // null이면 안된다
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true   // 고유하다는 option
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    school: {
        name: { type: String },
        major: { type: String }
    }
});
 
export default mongoose.model<UserInfo & mongoose.Document>("User", UserSchema);
