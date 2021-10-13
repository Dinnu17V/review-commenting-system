
// if there is no Users variable array in the local Storage then we need to create a null array - Users variable to add the
// registered users details in it . This is the first thing to be done on click on register button.
// Since the local storage(Applications tab of browser DevTools) takes values in string we Stringify before setting the values.
var arr = [];
if (localStorage.getItem("Users") == null) {
    localStorage.setItem("Users", JSON.stringify(arr));
}


function RegisterUser() {

    event.preventDefault();

    // get the values of the fields from the form
    var username = document.getElementById("UserName").value;
    var password = document.getElementById("Password").value;
    var email = document.getElementById("Email").value;

    // console.log(username);

    // ensure the fields are not empty if empty then show an alert
    if (username == "" || password == "" || email == "") {
        alert("Please Enter all the details");
        return;
    }

    // Validate the email id to contain both dot(".") and '@' , else show an alert
    var pattern = /[.]/g;
    if (!(email.includes('@')) || !(pattern.test(email))) {
        document.getElementById("form").reset();
        alert("Enter a Valid Email ID");
        return;
    }

    // object of User details to be set in the local Storage Variable Users.
    var user = {
        userid: getUserID(),//calls the function which returns an ID to uniquely identify each user.
        username: username,
        password: password,
        email: email,
        Connections: [], // to the connection between the current users and other users
        PendingReq: [], //to track the no of requests pending with the current user.
        Messages: []
    }
    // console.log(user);

    // To get the already existing Users details. 
    var users = JSON.parse(localStorage.getItem('Users'));

    // console.log(typeof arr);
    // console.log("email", email);
    // console.log(arr.push(user));
    //console.log(users.length);
    //console.log(users[0].Email + "array access");

    // To know if user already exists or not 
    var flag = 0;

    // iterate through to all the existing users in the local storage to check if user already exists
    // Assuming email as unique value
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

    // if the flag is still 0 then its a new user hence append to existing data and set to the users in local 
    // storage.
    if (flag == 0 || localStorage.getItem("Users") == null) {
        users.push(user);
        localStorage.setItem('Users', JSON.stringify(users));

    }
    // if flag is not 0 then user already exists
    else {
        alert("details already exits");
    }

    //}

    // reset the fields on the form
    document.getElementById("form").reset();
}



function getUserID() {
    // To uniquely identify each user (used while passing as parameters in dashboard.js script ), 
    // variable "UserId" to track the User Id and if there is no variable initialized then it is initialized to 0 else get the value
    // and update the ID by 1 before assigning to the next user.

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

