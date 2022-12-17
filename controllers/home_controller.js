const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {

    // version 2
    try {
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            }
            );

        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });

    } catch (error) {

        console.log(`Error in finding the posts to render : ${err}`);
        return;
        
    }


    // This code was sending just the user ID linked to Posts
    // Post.find({},(err,posts)=>{
    //     if(err){console.log(`Error in finding the posts to render : ${post}`); return;}

    //     return res.render('home',{
    //         title: "Codeial | Home",
    //         posts: posts
    //     })
    // })

    // Prepopulating the user before sending to browser version 1 without async await
    // Post.find({})
    // .populate('user')
    // .populate({
    //         path: 'comments',
    //         populate:{
    //             path: 'user'
    //         }
    //     }
    // )
    // .exec((err, posts) => {
    //     if (err) { console.log(`Error in finding the posts to render : ${err}`); return; }

    //     User.find({}, (err,users) => {

    //         return res.render('home', {
    //             title: "Codeial | Home",
    //             posts: posts,
    //             all_users: users 
    //         })

    //     });

    // })

}