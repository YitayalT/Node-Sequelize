$(function () {
  $("form").validate({
    rules: {
      uid: "required",
      fname: "required",
      lname: "required",
      uname: "required",
      city: "required",
      age: "required",
      email: "required",
      phone: "required",
      password: "required",
    },
    messages: {
      uid: "User id is required",
      fname: "first name is required",
      lname: "last name is required",
      uname: "user name is required!",
      city: "city is required!",
      age: "age is required!",
      email: " email is required",
      phone: "phone is required",
      password: 'password is required'
    },
  });


    // $(".invalid-feedback").hide();
    // //  $("input").addClass("is-invalid");
    // $("input").removeClass("is-invalid");
    // var uid = document.getElementById('uid').value;
    // console.log(uid);
    // $('form').submit(() => {
    //   if (uid == '') {
    //       $('input').addClass('is-invalid');
    //     $(".invalid-feedback").show();
    //   } 
    // })
    
  });
