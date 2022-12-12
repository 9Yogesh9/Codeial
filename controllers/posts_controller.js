const Post = require('../models/post');

module.exports.create_post = function (req, res) {
    Post.create({
        content: req.body.post_content,
        user: req.user._id
    }, function (err, post) {
        if (err) { console.log(`Error in creating post: ${err}`); return; }
        else {
            console.log("Post created successfully !",post);
            return res.redirect('back');
        }
    })
}