const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create_post = async function (req, res) {

    try {
        await Post.create({
            content: req.body.post_content,
            user: req.user._id
        });

        return res.redirect('back');

    } catch (error) {
        console.log(`Error in creating post: ${err}`);
        return;
    }

    // Previous CODE
    // Post.create({
    //     content: req.body.post_content,
    //     user: req.user._id
    // }, function (err, post) {
    //     if (err) { console.log(`Error in creating post: ${err}`); return; }
    //     else {
    //         console.log("Post created successfully !",post);
    //         return res.redirect('back');
    //     }
    // })
}

module.exports.destroy = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)

        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });
            return res.redirect('back');

        } else {

            return res.redirect('back');
            
        }
    } catch (error) {
        console.log(`No post found to be deleted : ${error}`);
        return;
    }


    // Previous CODE
    // Post.findById(req.params.id, (err, post) => {
    //     if (err) {
    //         console.log(`No post found to be deleted : ${err}`);
    //         return;
    //     }

    //     // .id means converting the object into string
    //     if (post.user == req.user.id) {
    //         post.remove();

    //         Comment.deleteMany({ post: req.params.id }, (err) => {
    //             return res.redirect('back');
    //         })
    //     } else {
    //         return res.redirect('back');
    //     }
    // })
}