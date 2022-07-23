const form = document.getElementById("form");
const uname = document.getElementById("uname");
const password = document.getElementById('password');
const role = document.getElementById('role');

// console.log(uid);
form.addEventListener("submit", (e) => {
    // e.preventDefault();
    // console.log('clicked');
  validateInputs();
});


const setError = (element, message) => {
    const inputControl = element.parentElement;
    // inputControl.className = "input-control error";
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = message;

    inputControl.classList.add("error");
    inputControl.classList.remove("success");

 
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
};

const validateInputs = () => {
    const userName = uname.value.trim();
    const passwordValue = password.value.trim();
    const roleValue = role.value.trim();

    if (userName === "") {
      setError(uname, "User name is required");
    }else {
      setSuccess(uname);
    }

    if (passwordValue === "") {
      setError(password, "password is required");
    } else {
      setSuccess(password);
    }

     if (roleValue === "") {
       setError(role, "role is required");
     } else {
       setSuccess(role);
     }
}