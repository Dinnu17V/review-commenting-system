function LoginUser() {

    event.preventDefault();

    var pwd = getValuebyID("Password");
    var email = getValuebyID("Email");

    var users = JSON.parse(localStorage.getItem('Users'));
    console.log(users);
    console.log(users[0].email + "array access");
    var flag = true;

    for (i = 0; i < users.length; i++) {
        var newobj = users[i];
        if (newobj.email == email && newobj.password == pwd) {


            localStorage.setItem("currentUser", email);
            flag = false;
            window.location.href = "../Dashboard/dasboard.html";

        }
        else {
            document.getElementById("Lform").reset();
        }
    }

    if (flag) {
        alert("Incorrect details");
        console.log("here i am with alert ", flag);
    }
    document.getElementById("Lform").reset();

}