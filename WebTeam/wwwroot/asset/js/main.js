// animation of search
let search = document.querySelector('.search');
search.onclick = function() {
    document.querySelector(".container_search").classList.toggle('active');

}

// clear search
let clear = document.querySelector('.clear');
clear.onclick = function() {
    document.getElementById("search").value = "";

}

// Silder
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 10000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';

    let last_active_dot = document.querySelector('.slider .dots li.active');

    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 10000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};

// Historical post
const newest_post = document.querySelector(".newest_post");
const top_reads = document.querySelector(".top_reads");
const oldest_post = document.querySelector(".oldest_post");

    if(newest_post) {
        newest_post.addEventListener("click", function() {
            document.querySelector(".list_newest_post").style.display = "flex"
            document.querySelector(".list_top_reads").style.display = "none"
            document.querySelector(".list_oldest_post").style.display = "none"
        })
    }

    if(top_reads) {
        top_reads.addEventListener("click", function() {
            document.querySelector(".list_newest_post").style.display = "none"
            document.querySelector(".list_top_reads").style.display = "flex"
            document.querySelector(".list_oldest_post").style.display = "none"
        })
    }
    
    if(oldest_post) {
        oldest_post.addEventListener("click", function() {
            document.querySelector(".list_newest_post").style.display = "none"
            document.querySelector(".list_top_reads").style.display = "none"
            document.querySelector(".list_oldest_post").style.display = "flex"
        })
    }

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

// Check validation login
function validation() {
    var form = document.getElementById('form');
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var error_email = document.getElementById('error_email');
    var correct = document.querySelector('.correct');
    var incorrect = document.querySelector('.incorrect');
    var error_psw = document.getElementById('error_psw');
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var passReg = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?& -]{8,50}$/;

    // Check format email
    if (!email) {
        form.classList.remove('valid');
        form.classList.add('invalid');
        error_email.innerHTML = "Email is required.";
        error_email.style.color = "#FF0000";
        return false;
    }
    else if (!email.match(emailPattern)) {
        form.classList.remove('valid');
        form.classList.add('invalid');
        error_email.innerHTML = "";
        incorrect.style.display = 'flex';
        correct.style.display = 'none';
        return false;
    }
    else {
        error_email.innerHTML = "";
        incorrect.style.display = 'none';
        correct.style.display = 'flex';
        error_email.style.color = "#000";
    }

    // Check format password
    if (!password) {
        form.classList.remove('valid');
        form.classList.add('invalid');
        error_psw.innerHTML = "Password is required.";
        error_psw.style.color = "#FF0000";
        return false;
    }
    else if (!password.match(passReg)) {
        form.classList.remove('valid');
        form.classList.add('invalid');
        error_psw.innerHTML = "Incorrect Password Format.";
        error_psw.style.color = "#FF0000";
        return false;
    }
    else {
        error_psw.innerHTML = "";
        error_psw.style.color = "#000";
    }

    form.classList.remove('invalid');
    form.classList.add('valid');
    return true;
}

console.log("Hello friend!!!")