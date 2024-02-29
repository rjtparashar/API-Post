const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 8000;
const Model = require("./model")

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/interview', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.get('/posts', async (req, res) => {
    try {
      const postsWithGoodComments = await Model.post.aggregate([
        {
          $lookup: {
            from: "comments",
            let: { postId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                       $eq: ["$$postId", "$postId"] ,
                  },
                },
              },
              // {
              //   $lookup: {
              //     from: "users",
              //     let: { userId: "$userId" },
              //     pipeline: [
              //       {
              //         $match: {
              //           $expr: {
              //                $eq: ["$$userId", "$_id"] ,
              //           },
              //         },
              //       },
              //       {
              //         $project:{
              //           firstName : 1
              //         }
              //       }
              //     ],
              //     as: "users",
              //   },
              // },  //if we want username in future
              {
                $project:{
                  comment:1,
                  _id:0
                }
              }
            ],
            as: "comments",
          },
        },
        {
          $addFields: {
            comments: {
              $filter: {
                input: '$comments',
                as: 'comment',
                cond: { $regexMatch: { input: '$$comment.comment', regex: /good/i } },
              },
            },
          },
        },
        {  
          $project: {
            post_name: 1,
            comments: {
              $cond: {
                if: { $eq: [{ $size: '$comments' }, 0] },
                then: [],
                else: '$comments',
              },
            },
          },
        },  
      ]);
  
      res.json(postsWithGoodComments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
