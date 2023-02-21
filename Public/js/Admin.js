let Loader = document.querySelector('.loader');

const adminElement = document.querySelector('.admin-space');
const productListingElement = document.querySelector('.product-listing');
const applyForm = document.querySelector('.apply-form');
const showApplyFormBtn = document.querySelector('#apply-btn');
const adminBtn = document.querySelector('#admin-btn')

window.onload = () => {
    if (sessionStorage.user) {
        let user = JSON.parse(sessionStorage.user);
        if (compareToken(user.authToken, user.email)) {
            if (!user.admin) {
                adminBtn.classList.remove('hide');
            }else{
                productListingElement.classList.remove('hide');
            }
           
        } else {
            location.replace('/login');
        }
    }
}
showApplyFormBtn.addEventListener('click', () => {
    adminElement.classList.add('hide');
    applyForm.classList.remove('hide');
})

// form submission

const applyFormButton = document.querySelector('#apply-form-btn');
const adminName = document.querySelector('#business-name');
const description = document.querySelector('#business-add');
const about = document.querySelector('#about');
const number = document.querySelector('#number');
const tac = document.querySelector('#terms-and-cond');

applyFormButton.addEventListener('click', () => {
    if (!adminName.value.length || !description.value.length || !about.value.length || !number.value.length) {
        showAlert('fill all the inpurts');
    } else if (!tac.checked){
        showAlert('you must agree to yours terms and conditions');
    }else{
        // making server request
        Loader.style.display ='block';
        sendData('/admin', {
            name: adminName.value,
            description:description.value,
            about: about.value,
            number: number.value,
            tac: tac.checked,
            email: JSON.parse(sessionStorage.user).email
        })
    }
})

// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};