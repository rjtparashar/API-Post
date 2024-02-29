const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
      comment: {
        type: String
      },
}, {
  timestamps: true,
 });
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;