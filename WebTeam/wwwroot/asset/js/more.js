
// Show more comment
document.addEventListener('DOMContentLoaded', function () {
    const showMoreButton = document.getElementById('show_more_btn');
    const comments = document.querySelectorAll('.comment');
    const commentsPerPage = 3;
    let visibleComments = commentsPerPage;

    // Hide all comments except the first `visibleComments`
    for (let i = 0; i < comments.length; i++) {
        if (i >= visibleComments) {
            comments[i].style.display = 'none';
        }
    }

    // Add event listener to show more button
    showMoreButton.addEventListener('click', function () {
        visibleComments += commentsPerPage;

        // Show next `commentsPerPage` comments
        for (let i = 0; i < comments.length; i++) {
            if (i < visibleComments) {
                comments[i].style.display = 'block';
            }
        }

        // Hide "Show More Comments" button if all comments are visible
        if (visibleComments >= comments.length) {
            showMoreButton.style.display = 'none';
        }
    });
});

// Go To Top
const toTop = document.querySelector(".js-gotop");
console.log(toTop);

window.addEventListener("scroll", () => {
    if(window.pageYOffset > 250) {
        toTop.classList.add("active");
    }else {
        toTop.classList.remove("active");
    }
})

console.log("hello friend")


           