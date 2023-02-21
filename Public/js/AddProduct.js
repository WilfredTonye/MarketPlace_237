let user = JSON.parse(sessionStorage.user || null);
let Loader = document.querySelector('.loader');

//checking user is logged in or not
window.onload = () =>{
    if (user) {
        if (!compareToken(user.authToken, user.email)) {
            location.replace('/login')
        }
    }else{
        location.replace('/login')
    }
}

//price inputs

const actualPrice = document.querySelector('#actual-price');
const discountPercentage = document.querySelector('#discount');
const  adminPrice = document.querySelector('#sell-price');

discountPercentage.addEventListener('input', () => {
    if (discountPercentage.value > 100) {
        discountPercentage.value = 90;
    }else{
        let discount = actualPrice.value * discountPercentage.value /100;
        adminPrice.value = actualPrice.value - discount;
    }
})

adminPrice.addEventListener('input', () => {
    let discount =(adminPrice.value / actualPrice.value)*100;
    discountPercentage.value = discount;
})

//upload image
let uploadImage = document.querySelector('.file-upload');
let imagePaths = []; //will store all upload images
