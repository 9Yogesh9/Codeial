const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function (req, res) {

    // This code was sending just the user ID linked to Posts
    // Post.find({},(err,posts)=>{
    //     if(err){console.log(`Error in finding the posts to render : ${post}`); return;}

    //     return res.render('home',{
    //         title: "Codeial | Home",
    //         posts: posts
    //     })
    // })

    // Prepopulating the user before sending to browser
    Post.find({})
    .populate('user')
    .populate({
            path: 'comments',
            populate:{
                path: 'user'
            }
        }
    )
    .exec((err, posts) => {
        if (err) { console.log(`Error in finding the posts to render : ${post}`); return; }

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        })
    })

}