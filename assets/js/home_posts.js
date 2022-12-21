{ //Extra bracket to preserve the scope

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
                },
                error: (error) => {
                    console.log(error.responseText);
                }
            })
    })
}

// Needs to called on load, to link itself to specific element
createPost();

// Method to create a post in DOM
let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
                <p>
                    <small>
                        <a class="delete-post-button" href="/posts/destroyposts/${post.id}"> X </a>
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

}