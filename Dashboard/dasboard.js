// In login the current user is updated here we retrieve the value and display on dashbord page
var currentuser = localStorage.getItem("currentUser");
//console.log(currentuser);
document.getElementById("message").innerHTML = "<p> Hello " + currentuser + "</p>";

//if no currentuser then redirect to login page this is useful when users is moving back and front from login
// and dashboard page
if (currentuser == null) {
    window.location.href = "../Login/Login.html";
}

//new variable to store the comments of each user in local storage
var arr = [];
if (localStorage.getItem("posts") == null) {
    localStorage.setItem("posts", JSON.stringify(arr));
}

//save ,text area, send button are hidden on load and displayed only when user clicks on edit
document.getElementById("saveb").style.display = "none";
document.getElementById("snd").style.display = "none";
document.getElementById("txt_a").style.display = "none";

// show posts,available users, connections,pending requests,messages of current user on load
showposts();
availableUsers();
connectionsofUser();
pending_requests();
DisplayMsg();

//to display all the registered users(who are not already in connections to the current users) along with connect option
// passing user_id as parameter to function connectUser to identify the user 
function availableUsers() {
    var list = "";
    var Allusr = JSON.parse(localStorage.getItem("Users"));
    //console.log(Allusr);
    for (var i = 0; i < Allusr.length; i++) {
        if (Allusr[i].email != currentuser && (Allusr[i].Connections.indexOf(currentuser) == -1)) {
            console.log(Allusr[i].username);
            list = list + "<li>" + Allusr[i].username + " &nbsp&nbsp&nbsp" + "<button id='connect' onclick='ConnectUser(" + Allusr[i].userid + ")'>Connect</button>" + "</li>" + "</br>";
        }
    }
    document.getElementById("availUsers").innerHTML = list;
}

//displaying all messages
function DisplayMsg() {
    var all_msgs = "";
    var Allusr = JSON.parse(localStorage.getItem("Users"));
    for (var i = 0; i < Allusr.length; i++) {
        if (Allusr[i].email == currentuser) {
            for (var j = 0; j < Allusr[i].Messages.length; j++) {
                all_msgs = all_msgs + "<li>" + Allusr[i].Messages[j] + "</li></br>";
            }
        }
        document.getElementById("msg_ul").innerHTML = all_msgs;
    }
}



// listing all the connections which current user has 
function connectionsofUser() {
    var conn = "";
    var Allusr = JSON.parse(localStorage.getItem("Users"));
    for (var i = 0; i < Allusr.length; i++) {
        if (Allusr[i].email == currentuser) {
            for (var j = 0; j < Allusr[i].Connections.length; j++) {
                //console.log("Connections : ", Allusr[i].Connections[j]);
                var user_id = getuserid(Allusr[i].Connections[j]);
                conn = conn + "<li>" + Allusr[i].Connections[j] + " &nbsp&nbsp&nbsp" + "<button id='msg' onclick='Message_User(" + user_id + ")'>Message</button>" + "</li>" + "</br>";
            }
        }
    }
    document.getElementById("MyConnections").innerHTML = conn;
}

// get the user whom the current user is messaging , display the text box and send button
function Message_User(user_id) {
    //as email_id safer option to use as unique key
    document.getElementById("txt_a").style.display = "block";
    document.getElementById("snd").style.display = "block";
    var email_id = getEmailId(user_id);
    // alert(email_id);
    document.getElementById("snd").onclick = function () {
        Addmsg(email_id);
    };

}

// the message is added in both current user and the user whom the current messaged
function Addmsg(email_id) {
    var users = JSON.parse(localStorage.getItem("Users"));
    var msg = document.getElementById("txt_a").value;
    var new_msg;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == currentuser || users[i].email == email_id) {
            new_msg = currentuser + " : " + msg;
            // alert(new_msg);
            users[i].Messages.push(new_msg);

        }
    }
    localStorage.setItem("Users", JSON.stringify(users));
    document.getElementById("txt_a").value = "";
    document.getElementById("txt_a").style.display = "none";
    document.getElementById("snd").style.display = "none";
    DisplayMsg();
}

// listing all the pending requests that current user has, along with an option to accept or reject the request
// passing user_id as parameter to accept and decline function so as to identify the user
function pending_requests() {
    var Req = "";
    var forRequests = JSON.parse(localStorage.getItem("Users"));
    var len;
    //console.log(Allusr);
    for (var i = 0; i < forRequests.length; i++) {
        if (forRequests[i].email == currentuser) {
            len = forRequests[i].PendingReq.length;

            for (var j = 0; j < len; j++) {
                var req_sent = getuserid(forRequests[i].PendingReq[j]);
                // sending the userid as parameter
                Req = "<li>" + forRequests[i].PendingReq[j] + "&nbsp&nbsp&nbsp " +
                    "<button onclick='Accept(" + req_sent + ")'>Accept</button>" + "</br>" +
                    "<button onclick='Decline(" + req_sent + ")'>Decline</button>" + "</li>" + Req + "</br>";
                //"<button onclick='DeletePost(" + count[i].UniqueId + ")'>Delete</button>" +
                // console.log("request from : " + req_sent);
            }
        }
    }
    document.getElementById("MyRequests").innerHTML = Req;
}


// to get user_id from email_id
function getuserid(email_id) {
    var Allusr = JSON.parse(localStorage.getItem("Users"));
    for (var i = 0; i < Allusr.length; i++) {
        if (Allusr[i].email == email_id) {
            return Allusr[i].userid;
        }
    }
}

// to get email_id from user_id 
function getEmailId(user_id) {
    var Allusr = JSON.parse(localStorage.getItem("Users"));
    for (var i = 0; i < Allusr.length; i++) {
        if (Allusr[i].userid == user_id) {
            return Allusr[i].email;
        }
    }
}

//once accepted the user must be added to current users connection(if not already in connections) and removed from pending requests
function Accept(user_id) {
    var email_1 = getEmailId(user_id);
    var Allusr = JSON.parse(localStorage.getItem("Users"));
    for (var i = 0; i < Allusr.length; i++) {
        if (Allusr[i].email == currentuser) {
            index = Allusr[i].PendingReq.indexOf(email_1);
            Allusr[i].PendingReq.splice(index, 1);
            if (Allusr[i].Connections.indexOf(email_1) == -1) {
                Allusr[i].Connections.push(email_1);
            }

        }
    }
    // also add the current user to the requested user's connection 
    for (var i = 0; i < Allusr.length; i++) {
        if (Allusr[i].email == email_1) {
            if (Allusr[i].Connections.indexOf(currentuser) == -1) {
                Allusr[i].Connections.push(currentuser);
            }
        }
    }
    localStorage.setItem("Users", JSON.stringify(Allusr));
    // updates the available users,pending requests and connections as page reloads
    availableUsers();
    connectionsofUser();
    pending_requests();
}

// Remove the requested user from current users pending requests
function Decline(user_id) {
    var email_1 = getEmailId(user_id);
    var Allusr = JSON.parse(localStorage.getItem("Users"));
    for (var i = 0; i < Allusr.length; i++) {
        if (Allusr[i].email == currentuser) {
            index = Allusr[i].PendingReq.indexOf(email_1);
            Allusr[i].PendingReq.splice(index, 1);
        }
    }
    localStorage.setItem("Users", JSON.stringify(Allusr));
    // updates the available,pending requests and connections as page reloads
    availableUsers();
    connectionsofUser();
    pending_requests();
}

// logging out of dashboard redirects to login page
function Logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "../Login/Login.html";
}

// time and date details for appending to the each comment 
function getTimedate() {
    var d = new Date();
    var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var date = d.getDate() + "-" + d.getDay() + "-" + d.getFullYear();
    return time + " " + date;
}

// unique id to differentiate each post/comment made by user later used to edit/delete post
function getUniqueID() {
    // var uniq = localStorage.getItem("UniqueId");
    if (localStorage.getItem("UniqueId") == null) {
        localStorage.setItem("UniqueId", 0);
    }
    var ID = parseInt(localStorage.getItem("UniqueId"));
    ID = ID + 1;
    localStorage.setItem("UniqueId", JSON.stringify(ID));
    return ID;
}

// get name of user using the email id provided
function getNameByEmail(currentuser) {
    var AllUsers = JSON.parse(localStorage.getItem("Users"));
    for (var i = 0; i < AllUsers.length; i++) {
        if (AllUsers[i].email == currentuser) {
            return AllUsers[i].username;
        }
    }
}

// create a new object for each post and append to the local storage
function post() {
    event.preventDefault();
    var post = getValuebyID("cmt");

    var userposts = {
        post: post,
        timestamp: getTimedate(),
        UniqueId: getUniqueID(),
        User: currentuser,
        Username: getNameByEmail(currentuser)
    }
    // console.log(userposts);
    var addpost = JSON.parse(localStorage.getItem("posts"));
    addpost.push(userposts)
    localStorage.setItem("posts", JSON.stringify(addpost));
    //removing the value from the text box
    document.getElementById("cmt").value = "";
    // updating the listing of posts with new posts 
    showposts();
}

// listing all the posts by current user
function showposts() {
    var element = document.getElementById("AllPosts");

    var count = JSON.parse(localStorage.getItem("posts"));
    var Allposts = "";
    for (var i = 0; i < count.length; i++) {
        if (count[i].User == currentuser) {
            Allposts = Allposts +
                "<li>" + "<b>" + count[i].Username + "</b> : " + count[i].post +
                "&nbsp &nbsp &nbsp " + count[i].timestamp + "&nbsp &nbsp &nbsp " +
                "<button onclick='DeletePost(" + count[i].UniqueId + ")'>Delete</button>" +
                " &nbsp &nbsp &nbsp" + "<button onclick ='PostEdit("
                + count[i].UniqueId + ")'>Edit</button>" + "</li>" + " </br></br>  ";
        }
        else {
            Allposts = Allposts +
                "<li>" + "<b>" + count[i].Username + "</b> : " + count[i].post +
                "&nbsp &nbsp &nbsp " + count[i].timestamp +
                "</li>" + " </br></br>  ";
        }

    }
    element.innerHTML = Allposts;
}

// deleting the post using the unique id of each post/comment
function DeletePost(UniqueId) {
    event.preventDefault();
    var Posts = JSON.parse(localStorage.getItem("posts"));
    for (var i = 0; i < Posts.length; i++) {
        if (Posts[i].UniqueId == UniqueId) {
            Posts.splice(i, 1);
        }
    }
    localStorage.setItem("posts", JSON.stringify(Posts));
    showposts();
}

// editing the post using the unique id of the post/comment, display the save button and hide post button
function PostEdit(UniqueId) {
    event.preventDefault();
    var Posts = JSON.parse(localStorage.getItem("posts"));
    for (var i = 0; i < Posts.length; i++) {
        if (Posts[i].UniqueId == UniqueId) {
            document.getElementById("cmt").value = Posts[i].post;
            localStorage.setItem("EditID", Posts[i].UniqueId);
            console.log(localStorage.getItem("EditID", Posts[i].UniqueId));
        }
    }
    // localStorage.setItem("posts", JSON.stringify(Posts));
    // showposts();
    document.getElementById("saveb").style.display = "inline";
    document.getElementById("post").style.display = "none";

}

// updating the comment using the unique id of the post/comment, display the post button and hide the save button
// and empty the text area
function Save() {
    event.preventDefault();
    var Posts = JSON.parse(localStorage.getItem("posts"));
    var id = parseInt(localStorage.getItem("EditID"));
    var newpost = document.getElementById("cmt").value;
    for (var i = 0; i < Posts.length; i++) {
        if (Posts[i].UniqueId == id) {
            //alert(newpost);
            Posts[i].post = newpost;
            //alert(Posts[i].post);
            localStorage.setItem("posts", JSON.stringify(Posts));

        }
    }
    document.getElementById("cmt").value = "";
    document.getElementById("saveb").style.display = "none";
    localStorage.removeItem("EditID");
    document.getElementById("post").style.display = "block";
    showposts();
}

// add the current users email to pending requests of the user they want to connect to.
function ConnectUser(userid) {
    event.preventDefault();
    alert("Request is sent");
    var arr;
    var Allusr = JSON.parse(localStorage.getItem("Users"));
    for (var i = 0; i < Allusr.length; i++) {

        if (Allusr[i].userid == userid && (Allusr[i].PendingReq.indexOf(currentuser) == -1) &&
            (Allusr[i].Connections.indexOf(currentuser) == -1)) {
            // console.log("all req before", Allusr[i].PendingReq);
            arr = Allusr[i].PendingReq;
            arr.push(currentuser);
            localStorage.setItem("Users", JSON.stringify(Allusr));
        }
    }

}
