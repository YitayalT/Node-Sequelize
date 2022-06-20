// const form = document.getElementById("form");
// const uid = document.getElementById("uid");

// console.log(uid);
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   validateInputs();
// });


// const setError = (element, message) => {
//   const inputControl = element.parentElement;
//   const errorDisplay = inputControl.querySelector(".error");

//   errorDisplay.innerText = message;
//   inputControl.classList.add("error");
//   inputControl.classList.remove("success");
// };

// const setSuccess = (element) => {
//   const inputControl = element.parentElement;
//   const errorDisplay = inputControl.querySelector(".error");

//   errorDisplay.innerText = "";
//   inputControl.classList.add("success");
//   inputControl.classList.remove("error");
// };

// const validateInputs = () => {
//     const uidValue = uid.value.trim();
  

//     if (uidValue === "") {
//       setError(uid, "User Id is required");
//     } else {
//       setSuccess(uid);
//     }
// }