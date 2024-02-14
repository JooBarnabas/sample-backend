import mongoose from "mongoose";
import IPost from "./post.interface";

const postSchema = new mongoose.Schema<IPost>({
  author: String,
  content: String,
  title: String,
},
 { versionKey: false });

const postModel = mongoose.model<IPost>("Post", postSchema);

export default postModel;
