const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  cloudinary_id: { type: String },
  cloudinary_url: { type: String },
  date: { type: Date, default: Date.now },
});
//DIARIO AMARILLISTA//

PostSchema.index({ title: "text" });

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
