const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  post_name: {
    type: String
  },
}, {
  timestamps: true,
 });
const Post = mongoose.model("Post", postSchema);
module.exports = Post;