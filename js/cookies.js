let userId = -1;
let firstName = "";
let lastName = "";

saveCookie = (user) => {
    userId = user.userId;
    firstName = user.firstName;
    lastName = user.lastName;
    let minutes = 20
    let date = new Date()
    date.setTime(date.getTime() + (minutes * 60 * 1000))

    document.cookie = "firstName=" + firstName + ";expires=" + date.toGMTString()
    document.cookie = "lastName=" + lastName + ";expires=" + date.toGMTString()
    document.cookie = "userId=" + userId + ";expires=" + date.toGMTString()
}

readCookie = () => {
    userId = -1
    let data = document.cookie
    let cookiesArray = data.split(";")

    for (let i = 0; i < cookiesArray.length; i++) {
        let thisOne = cookiesArray[i].trim()
        let item = thisOne.split("=")

        if (item[0] == "firstName") {
            firstName = item[1]
        }

        else if (item[0] == "lastName") {
            lastName = item[1]
        }

        else if (item[0] == "userId") {
            userId = parseInt(item[1].trim())
        }
    }

    if (userId < 0) {
        window.location.href = "index.html"
    }

    else {
        document.getElementById("userName").innerHTML = "Welcome, " + firstName + " " + lastName + "!"
    }
}
