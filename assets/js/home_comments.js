{ //Extra bracket to preserve the scope
    let all_comment_blocks = document.getElementsByClassName('new-comment-form');

    // Method to create Comments using AJAX
    let createComment = (comment_form_data) => {

        comment_form_data.submit((e) => {
            e.preventDefault();
            console.log(comment_form_data);


        })
    }

    for( a of all_comment_blocks){
        createComment(a);
    }

    

}