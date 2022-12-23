{ //Extra bracket to preserve the scope


    // Display notification with Noty
    function notify(type, message) {
        if (type == 'success') {
            new Noty({
                theme: 'relax',
                text: message,
                type: "success",
                layout: "topRight",
                timeout: 1500
            }).show();
        }

        if (type == 'error') {
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
                    let newPost = newPostDom(data.data.post, data.data.user_name);
                    $('.posts_container>ul').prepend(newPost);
                    newComment(data.data.post._id);
                    deletePost($(' .delete-post-button'), newPost);
                    notify('success', "Post published !");
                },
                error: (error) => {
                    console.log(error.responseText);
                }
            })
        })
    }
    
    // Link comment submit event 
    let newComment = (postID) => {
        let newCommentForm = $(`#new_comment_form_${postID}`);

        newCommentForm.submit((e) => {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comments/createComment',
                data: newCommentForm.serialize(),
                success: (data) => { 
                    console.log(data);
                    let newComment = newCommentDom(data.data.comment._id, data.data.comment.content, data.data.user_name);
                    $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
                    notify('success', "Comment created !");
                },
                error: (error) => { console.log(error.responseText); }
            })
        })

    }

    // Method to create a comment in DOM
    let newCommentDom = function (commentID, content, username) {
        return $(`<li id="comment-${commentID}">
                    <p>
                        <small>
                            <a href="/comments/destroyComment/${commentID}"> X </a>
                        </small>
                            ${content} 
                        <br>
                        <small>
                            ${username}
                        </small>
                    </p>
                </li>`)
    }

    // Method to create a post in DOM
    let newPostDom = function (post, user_name) {
        return $(`<li id="post-${post._id}">
                <p>
                    <small>
                        <a class="delete-post-button" href="/posts/destroyposts/${post._id}"> X </a>
                    </small>

                    ${post.content}
                    <small>
                        ${user_name}
                    </small>
                </p>
                <div class="post_comments">
                        <form action="/comments/createComment" id="new_comment_form_${post._id}"  class="new_comment_form" method="post">
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