const baseURL = 'http://146.190.67.167/LAMPAPI' 

sendForm = () => {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let userId = 0 
    let firstName = "" 
    let lastName = "" 

    let payload = {
        Login: username,
        Password: password
    }

    if (!validateForm(payload)) {
        document.getElementById("loginResult").innerHTML = "Invalid login!"
        return
    }

    payload.Password = md5(password)

    let jsonPayload = JSON.stringify(payload) 

    let newRequest = new XMLHttpRequest() 

    newRequest.open("POST", `${baseURL}/Login.php`, true) 
    newRequest.setRequestHeader("Content-type", "application/json  charset=UTF-8") 

    try {

        newRequest.send(jsonPayload);
        console.log("HEllO!");
        newRequest.onreadystatechange = () => {
            if (newRequest.readyState == 4 && newRequest.status == 200) {

                console.log(newRequest.readyState);

                let jsonObject = JSON.parse(newRequest.responseText);
                userId = jsonObject.id;

                if (userId < 1) {
                    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                    return;
                }

                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                const foundUser = { firstName, lastName, userId };
                // console.log("Working?");
                saveCookie(foundUser);
                // window.location.href = "contacts.html";
            }
        }

        
    } catch (err) {
        document.getElementById("loginResult").innerHTML = err.message;
    }
}

validateForm = (newLog) => {
    const { Login, Password } = newLog

    if (Login == "") {
        console.log("Login is blank")
        return false
    }
    let regex = /(?=.*[a-zA-Z])([a-zA-Z0-9-_]).{3,18}$/

    if (regex.test(Login) == false) {
        console.log("Login is not valid")
        return false
    }

    if (Password == "") {
        console.log("Password is blank")
        return false
    }

    regex = /(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*]).{8,32}/

    if (regex.test(Password) == false) {
        console.log("Password is not valid")
        return false
    }

    return true
}


