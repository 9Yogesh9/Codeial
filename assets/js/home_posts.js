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
                success: (data) => { console.log(data); },
                error: (error) => { console.log(error.responseText); }
            })
        })
    }

    // Needs to called on load, to link itself to specific element
    createPost();

    // Method to create a post in DOM

}