import mongoose from "mongoose";
import { BlogCreateDto } from "./BlogCreateDto";

export interface BlogResponseDto extends BlogCreateDto{
    _id: mongoose.Schema.Types.ObjectId;
}
