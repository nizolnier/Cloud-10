

function grabSignUp() {
    console.log("FUNCTION RUNNING");
    let xhr = new XMLHttpRequest();
    
    xhr.open("POST", '/LAMPAPI/SignUp.php');
    xhr.setRequestHeader('Content-Type', 'application/json');

    var registrationData = {
        firstName : document.getElementById("nameFirst"),
        lastName : document.getElementById("nameLast"),
        username : document.getElementById("usernameSignUp"),
        password : document.getElementById("passwordSignUp")
    }

    var jsonData = JSON.stringify(registrationData);

    // Send the request with the JSON Data
    xhr.send(jsonData);

    // Handle the response from the server
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Registration Sucessful');
        } else {
            console.log('Registration Failed');
        }
    };

}