var arr = [];
if (localStorage.getItem("Users") == null) {
    localStorage.setItem("Users", JSON.stringify(arr));
}


function RegisterUser() {

    event.preventDefault();


    var username = document.getElementById("UserName").value;
    var password = document.getElementById("Password").value;
    var email = document.getElementById("Email").value;

    console.log(username);

    if (username == "" || password == "" || email == "") {
        alert("Please enter all the details");
        return;
    }
    var pattern = /[.]/g;
    if (!(email.includes('@')) || !(pattern.test(email))) {
        document.getElementById("form").reset();
        alert("Enter a Valid Email ID");
        return;
    }

    var user = {
        userid: getUesrID(),
        username: username,
        password: password,
        email: email,
        Connections: [],
        PendingReq: []
    }
    console.log(user);
    var users = JSON.parse(localStorage.getItem('Users'));
    // console.log(typeof arr);
    console.log("email", email);
    // console.log(arr.push(user));
    //console.log(users.length);
    //console.log(users[0].Email + "array access");

    var flag = 0;

    if (users.length > 0) {
        //console.log("this is for length" + users.length);
        for (i = 0; i < users.length; i++) {
            console.log("this is for username " + users[i].email);
            //console.log("this is for username " + users[i].password);
            var newobj = users[i]
            if (newobj.email == email) {
                flag++;
            }
        }
    }
    if (flag == 0 || localStorage.getItem("Users") == null) {
        users.push(user);
        localStorage.setItem('Users', JSON.stringify(users));

    }
    else {
        alert("details already exits");
    }

    //}

    document.getElementById("form").reset();
}

function getUesrID() {


    // var uniq = localStorage.getItem("UniqueId");
    if (localStorage.getItem("userid") == null) {
        localStorage.setItem("userid", 0);
    }
    var ID = parseInt(localStorage.getItem("userid"));
    ID = ID + 1;
    localStorage.setItem("userid", JSON.stringify(ID));
    console.log(ID);
    return ID;
}




    //localStorage.setItem(users, []);

