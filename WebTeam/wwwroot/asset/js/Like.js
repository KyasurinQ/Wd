const likeButton = document.querySelector('.like');

likeButton.addEventListener('click', function () {
    const isLiked = likeButton.classList.contains('liked');

    if (isLiked) {
        likeButton.classList.remove('liked');
    } else {
        likeButton.classList.add('liked');
    }
});