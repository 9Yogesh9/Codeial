{ //Extra bracket to preserve the scope


    // Display notification with Noty
    function notify(type, message){
        if(type == 'success'){
            new Noty({
                theme: 'relax',
                text: message,
                type: "success",
                layout: "topRight",
                timeout: 1500
            }).show();
        }

        if(type == 'error'){
            new Noty({
                theme: 'relax',
                text: message,
                type: "error",
                layout: "topRight",
                timeout: 1500
            }).show();
        }
    }

    // Method to submit the form data for new post using AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit((e) => {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/createposts',
                data: newPostForm.serialize(),
                success: (data) => {
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('.posts_container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button'), newPost);
                    notify('success',"Post published !");
                },
                error: (error) => {
                    console.log(error.responseText);
                }
            })
        })
    }

    // Method to create a post in DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
                <p>
                    <small>
                        <a class="delete-post-button" href="/posts/destroyposts/${post._id}"> X </a>
                    </small>

                    ${post.content}
                    <small>
                        ${post.user.name}
                    </small>
                </p>
                <div class="post_comments">
                        <form action="/comments/createComment" method="post">
                            <input type="text" name="content" id="" placeholder="Type here to add comment..." required>
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add Comment">
                        </form> 
            
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">

                        </ul>
                    </div>
                </div>
                </li>`)
    }

    // Method to delete a post from DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click((e) => {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: (data) => {
                    $(`#post-${data.data.post_id}`).remove();
                    notify('error', "Post and associated comments are deleted !");
                },
                error: (err) => {
                    console.log(err.responseText);
                }
            })
        })
    }

    // Linking deletePost to all preloaded
    let link_del_ajax = () => {
        let grab_posts = document.getElementsByClassName('delete-post-button');
        for (a of grab_posts)
            deletePost(a);
    }
    link_del_ajax();

    // Needs to called on load, to link itself to specific element
    createPost();

}