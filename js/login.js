const baseURL = 'http://http://146.190.67.167/LAMPAPI' 

sendForm = () => {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let userId = 0 
    let firstName = "" 
    let lastName = "" 

    let payload = {
        login: username,
        password: password
    }

    if (!validateForm(payload)) {
        document.getElementById("loginResult").innerHTML = "Invalid login!"
        return
    }

    let hash = md5(password) 

    payload.password = md5(password)

    let jsonPayload = JSON.stringify(payload) 

    let newRequest = new XMLHttpRequest() 

    newRequest.open("POST", `${baseURL}/Login.php`) 
    newRequest.setRequestHeader("Content-type", "application/json  charset=UTF-8") 

    try {
        newRequest.onreadystatechange = () => {
            if (this.readyState == 4 && this.status == 200) {

                let jsonObject = JSON.parse(newRequest.responseText)
                userId = jsonObject.id

                if (userId < 1) {
                    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect"
                    return
                }

                firstName = jsonObject.firstName
                lastName = jsonObject.lastName

                const foundUser = { firstName, lastName, userId }

                saveCookie(foundUser)
                window.location.href = "contacts.html"
            }
        }

        newRequest.send(jsonPayload)
    } catch (err) {
        document.getElementById("loginResult").innerHTML = err.message
    }
}

validateForm = (newLog) => {
    const { username, password } = newLog

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



