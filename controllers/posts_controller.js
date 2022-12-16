const Post = require('../models/post');
const Comment = require('../models/comment');

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

module.exports.destroy = (req,res) => {
    Post.findById(req.params.id, (err,post) =>{
        if(err){
            console.log(`No post found to be deleted : ${err}`);
            return;
        }

        // .id means converting the object into string
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id},(err)=>{
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}