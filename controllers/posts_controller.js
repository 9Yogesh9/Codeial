const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create_post = async function (req, res) {

    try {
        let post = await Post.create({
            content: req.body.post_content,
            user: req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: post,
                },
                message: "Post Created !"
            });
        }

        req.flash('success', "Post published !");
        return res.redirect('back');

    } catch (error) {
        req.flash('error', `Error in creating post`);
        // console.log(`Error in creating post: ${err}`);
        return res.redirect('back');
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

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', "Post and associated comments are deleted !");

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