// console.log("hey express")

const contactForm = document.querySelector('.contact_from');
let username = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');
let Errormsg = document.getElementById("Error");

contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let formData = {
        username : username.value,
        email : email.value,
        subject : subject.value,
        message : message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
        console.log(xhr.responseText);
        if(xhr.responseText == "success") {
            // alert('Email Sent');
            Errormsg.innerHTML = "Email sent";
            username.value = '';
            email.value = '';
            subject.value = '';
            message.value= '';
        }
        else {
            // alert("someting went wrong");
            Errormsg.innerHTML = "something went wrong"
        }
    }
    xhr.send(JSON.stringify(formData))
})