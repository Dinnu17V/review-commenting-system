
var currentuser = localStorage.getItem("currentUser");
//console.log(currentuser);
document.getElementById("message").innerHTML = "<p> Hello " + currentuser + "</p>";

if (currentuser == null) {
    window.location.href = "../Login/Login.html";
}

var arr = [];
if (localStorage.getItem("posts") == null) {
    localStorage.setItem("posts", JSON.stringify(arr));
}
document.getElementById("saveb").style.display = "none";

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

var conn = "";
var Allusr = JSON.parse(localStorage.getItem("Users"));

for (var i = 0; i < Allusr.length; i++) {
    if (Allusr[i].email == currentuser) {
        for (var j = 0; j < Allusr[i].Connections.length; j++) {
            console.log("Connections : ", Allusr[i].Connections[j]);
            conn = conn + "<li>" + Allusr[i].Connections[j] + "</li>" + "</br>";
        }


    }
}
document.getElementById("MyConnections").innerHTML = conn;

var Req = "";
var forRequests = JSON.parse(localStorage.getItem("Users"));
var len;
//console.log(Allusr);
for (var i = 0; i < forRequests.length; i++) {
    if (forRequests[i].email == currentuser) {
        len = forRequests[i].PendingReq.length;

        for (var j = 0; j < len; j++) {
            localStorage.setItem("PendingRequest", forRequests[i].PendingReq[j]);
            console.log("request from : " + forRequests[i].PendingReq[j]);

            Req = "<li>" + forRequests[i].PendingReq[j] + "&nbsp&nbsp&nbsp " +
                "<button onclick='Accept()'>Accept</button>" + "</br>" +
                "<button onclick='Decline()'>Decline</button>" + "</li>" + Req + "</br>";

        }
    }
}
document.getElementById("MyRequests").innerHTML = Req;



function Accept() {
    var email_1 = localStorage.getItem("PendingRequest");
    //localStorage.removeItem("PendingRequest");
    console.log("Accept from : ", email_1);
    var Allusr = JSON.parse(localStorage.getItem("Users"));
    for (var i = 0; i < Allusr.length; i++) {
        if (Allusr[i].email == currentuser) {
            index = Allusr[i].PendingReq.indexOf(email_1);
            //console.log("the index", index);
            Allusr[i].PendingReq.splice(index, 1);
            //console.log(Allusr[i].PendingReq);
            if (Allusr[i].Connections.indexOf(email_1) == -1) {
                Allusr[i].Connections.push(email_1);
            }

        }
    }
    for (var i = 0; i < Allusr.length; i++) {
        if (Allusr[i].email == email_1) {
            if (Allusr[i].Connections.indexOf(currentuser) == -1) {
                Allusr[i].Connections.push(currentuser);
            }
        }
    }
    localStorage.setItem("Users", JSON.stringify(Allusr));
    window.location.href = "../Dashboard/Dasboard.html";
}

function Decline() {

    var email_1 = localStorage.getItem("PendingRequest");

    var Allusr = JSON.parse(localStorage.getItem("Users"));
    for (var i = 0; i < Allusr.length; i++) {
        if (Allusr[i].email == currentuser) {
            index = Allusr[i].PendingReq.indexOf(email_1);

            Allusr[i].PendingReq.splice(index, 1);
        }
    }
    localStorage.setItem("Users", JSON.stringify(Allusr));
    window.location.href = "../Dashboard/Dasboard.html";
}

function Logout() {

    localStorage.removeItem("currentUser");
    window.location.href = "../Login/Login.html";

}

function getTimedate() {
    var d = new Date();

    var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var date = d.getDate() + "-" + d.getDay() + "-" + d.getFullYear();
    return time + " " + date;

}

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

function getNameByEmail(currentuser) {
    var AllUsers = JSON.parse(localStorage.getItem("Users"));
    for (var i = 0; i < AllUsers.length; i++) {
        if (AllUsers[i].email == currentuser) {
            return AllUsers[i].username;
        }
    }
}

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
    console.log(userposts);
    var addpost = JSON.parse(localStorage.getItem("posts"));
    addpost.push(userposts)
    localStorage.setItem("posts", JSON.stringify(addpost));
    document.getElementById("cmt").value = "";
    //document.getElementById("AllPosts").innerHTML = " ";
    showposts();
}

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

    }
    element.innerHTML = Allposts;
}

function DeletePost(UniqueId) {
    event.preventDefault();
    var Posts = JSON.parse(localStorage.getItem("posts"));
    for (var i = 0; i < Posts.length; i++) {
        if (Posts[i].UniqueId == UniqueId) {

            Posts.splice(i, 1);
            //alert(Posts);
        }
    }
    localStorage.setItem("posts", JSON.stringify(Posts));
    showposts();
}

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
    //document.getElementById("post").style.display = "none";

}

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
    localStorage.removeItem("EditID");
    showposts();
}

function ConnectUser(userid) {
    event.preventDefault();
    //console.log("userid of the user", userid);
    // var element = document.getElementById('connect');
    //document.getElementById('connect').innerHTML = "Request Sent";
    // element.parentNode.parentNode.removeChild(element);
    //var email = getNameByEmail(currentuser);
    alert("Request is sent");


    var arr;
    var Allusr = JSON.parse(localStorage.getItem("Users"));
    //console.log(Allusr);
    for (var i = 0; i < Allusr.length; i++) {

        if (Allusr[i].userid == userid && (Allusr[i].PendingReq.indexOf(currentuser) == -1) &&
            (Allusr[i].Connections.indexOf(currentuser) == -1)) {
            console.log("all req before", Allusr[i].PendingReq);
            //console.log("all users", Allusr[i].Connections);
            arr = Allusr[i].PendingReq;
            //console.log(" before array", arr);
            arr.push(currentuser);
            //console.log("after array", arr);
            localStorage.setItem("Users", JSON.stringify(Allusr));
        }
    }

}
