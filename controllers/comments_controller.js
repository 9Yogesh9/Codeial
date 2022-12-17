const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComment = async (req, res) => {

    try {
        let post = await Post.findById(req.body.post);

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            return res.redirect('/');
        }
    }catch(error){
        console.log(`Error in creating the comment ${error}`);
        return;
    }

    // Previous CODE
    // Post.findById(req.body.post, (err, post) => {
    //     if (post) {
    //         Comment.create({
    //             content: req.body.content,
    //             post: req.body.post,
    //             user: req.user._id
    //         }, (err, comment) => {
    //             // Handle the error

    //             // MongoDB provides the utility to fetch the id of current comment and push it in the array
    //             post.comments.push(comment);
    //             post.save();

    //             res.redirect('/');
    //         })
    //     }
    // })
};

module.exports.destroy_comment = (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) { console.log("comment delete ", err); return; }

        if (comment.user == req.user.id) {
            // noting the post id for which the comment was created to clear the id of comment from the post->comments array
            let postId = comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, (err, post) => {
                return res.redirect('back');
            })
        } else {
            return res.redirect('back');
        }
    })
}