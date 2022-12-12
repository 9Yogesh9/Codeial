const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComment = (req, res) => {

    // console.log(req.body.content , " ", req.body.post, " " , req.user._id);
    // res.redirect('/');

    Post.findById(req.body.post, (err, post) => {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, (err, comment)=>{
                // Handle the error

                // MongoDB provides the utility to fetch the id of current comment and push it in the array
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            })
        }
    })
};