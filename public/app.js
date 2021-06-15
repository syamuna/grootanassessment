
function validateForm() {

    let data = localStorage.getItem('details') ? JSON.parse(localStorage.getItem('details')) : [];;
    let formData = {
        "name": document.getElementById("uName").value,
        "email": document.getElementById("uEmail").value,
        "contactno": document.getElementById("uContactno").value,
        "password": document.getElementById("uPassword").value,
        "confirmpassword": document.getElementById("confirmPassword").value
    }
    data.push(formData);
    if (localStorage) {
        localStorage.setItem("details", JSON.stringify(data));
    }
}
//Check if password is matching
function verifyPassword(input) {
    if (input.value != document.getElementById("uPassword").value) {
        input.setCustomValidity("Password Must be Matching");
    } else {
        input.setCustomValidity("");
    }
}
//check already registered users
function emailExist(value) {
    let existemail = JSON.parse(localStorage.getItem("details"));

    let emailid = existemail.map((email, i, existemail) => {
        return existemail[i].email;
    });

    let getexistemail = emailid.filter((email) => {
        if (email == value.value) {
            value.setCustomValidity('email exist. try something else');

        } else {
            value.setCustomValidity("");
        }
    });
}
//Handling bubbling
const form = document.getElementById("registerForm");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.reset();
    document.getElementById("thankYou").style.display = "block";
    form.style.display = "none";
});


//login here
function loginUser() {

    let loginEmail = document.getElementById("uemailId").value;
    let loginPass = document.getElementById("ePassword").value;
    let matchEmail = JSON.parse(localStorage.getItem("details"));
    let emailArray = [];
    let passArray = [];
    let result = matchEmail.map((email, i, matchEmail) => {

        emailArray.push(matchEmail[i].email);
        passArray.push(matchEmail[i].password);
    });
    // console.log(emailArray);
    if (emailArray.indexOf(loginEmail) > -1 && passArray.indexOf(loginPass) > -1) {
        console.log("You have sucsessfuly loged in");
    } else {
        console.log("You have no registered with us");
    }

}
const loginForm = document.getElementById("logIn");
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    loginForm.reset();
    getData();
    loginForm.style.display = "none";
});

async function getData() {
    const response = await fetch(`http://localhost:3000/users`);
    const data = await response.json();
    // if empty result 
    console.log(data.users);
    createData(data.users);
}


function createData(users) {
    console.log(users);
    document.getElementById("afterlogin").style.display = "block";
    document.getElementById("afterlogin").innerHTML = `
    <div><h1>Details of the Users</h1>

    ${users.map(user => {
        return `<button class="accordion">User Name: ${user.name} ${user.surname}</button>
        <ul class="panel">
                <li><b>First Name: </b>${user.name}</li>
                <li><b>Last Name: </b>${user.surname}</li>
                <li><b>Contact No: </b>${user.phone}</li>
                <li><b>Email:  </b>${user.email}</li>
                <li><b>Address: </b>${user.number},${user.address},${user.city},${user.postalCode}</li>
            </ul>`
    }).join('')}
    <div>
    <a href="javascript:void(0);"
            onclick="showHide('logIn', 'afterlogin')"><button>LogOut</button></a></div> </div>`
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}


function showHide(show, hide) {
    let showEle = document.getElementById(show);
    let hideEle = document.getElementById(hide);
    showEle.style.display = "block";
    hideEle.style.display = "none";
}