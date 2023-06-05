const baseURL = 'http://cop4331group10.xyz/LAMPAPI';

sendForm = () => {
    let fname = document.getElementById("fname").value
    let lname = document.getElementById("lname").value
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    console.log(fname)
    console.log(lname)
    console.log(username)
    console.log(password)

    let payload = {
        firstName: fname,
        lastName: lname,
        login: username,
        password: password
    }

    if (!validateForm(payload)) {
        document.getElementById("signupResult").innerHTML = "Invalid signup!"
        return
    }

    payload.password = md5(payload.password)

    const jsonPaylod = JSON.stringify(payload)

    let newRequest = new XMLHttpRequest();
    
    newRequest.open("POST", `${baseURL}/SignUp.php`, true);

    newRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8");


    try {

        newRequest.send(jsonPaylod);

        newRequest.onreadystatechange = () => {
            console.log(newRequest.readyState);
            console.log(newRequest.status)


            if (newRequest.readyState != 4) {
                return;
            }

            if (this.status == 409) {
                document.getElementById("signupResult").innerHTML = "User already exists";
                return;
            }
            
            if (newRequest.status == 200) {
                console.log("Sucess!");
                // let jsonObject = JSON.parse(newRequest.responseText);
                document.getElementById("signupResult").innerHTML = "User added, redirecting to log in";
                window.location.href = "login.html";
            }

            else {
                document.getElementById("signupResult").innerHTML = "Failed to register.";

            }

        }

        

    }
    catch (error) {
        document.getElementById("signupResult").innerHTML = error.message;

    }

}

validateForm = (newUser) => {
    const { firstName, lastName, username, password } = newUser

    if (firstName == "") {
        console.log("First name is blank")
        return false
    }

    if (lastName == "") {
        console.log("Last name is blank")
        return false
    }

    if (username == "") {
        console.log("Username is blank")
        return false
    }
    let regex = /(?=.*[a-zA-Z])([a-zA-Z0-9-_]).{3,18}$/

    if (regex.test(username) == false) {
        console.log("Username is not valid")
        return false
    }

    if (password == "") {
        console.log("Password is blank")
        return false
    }

    regex = /(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*]).{8,32}/

    if (regex.test(password) == false) {
        console.log("Password is not valid")
        return false
    }

    return true
}