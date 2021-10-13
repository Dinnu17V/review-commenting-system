function LoginUser() {

    event.preventDefault();
    // get values from the form
    var pwd = getValuebyID("Password");
    var email = getValuebyID("Email");

    // to all the existing users details from local storage
    var users = JSON.parse(localStorage.getItem('Users'));
    console.log(users);
    console.log(users[0].email + "array access");
    var flag = true; // to identify if user is registered or not 


    for (i = 0; i < users.length; i++) {
        var newobj = users[i]; // Get each user details and if email and password matches to that of values entered
        // on the form.
        if (newobj.email == email && newobj.password == pwd) { //if satistified then its valid user. 

            // to idetify the current logged in user
            localStorage.setItem("currentUser", email);
            flag = false;
            // redirecting to dashboard page
            window.location.href = "../Dashboard/dasboard.html";

        }
        else {
            // if not a valid user or incorrect details then reset the fields on the form
            document.getElementById("Lform").reset();
        }
    }

    if (flag) {
        // alert that details are incorrect
        alert("Incorrect details");
        console.log("here i am with alert ", flag);
    }
    document.getElementById("Lform").reset();

}