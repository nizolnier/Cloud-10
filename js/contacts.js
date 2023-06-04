const baseURL = 'http://cop4331group10.xyz/LAMPAPI';

logout = () => {
    userId = 0
    firstName = ""
    lastName = ""

    document.cookie = "firstName=   expires = Thu, 01 Jan 1970 00:00:00 GMT"
    window.location.href = "index.html"
}
loadContacts = () => {

}

addContact = () => {
    let firstName = document.getElementById("contactFName").value;
    let lastName = document.getElementById("contactLName").value;
    let phoneNumber = document.getElementById("contactNumber").value;
    let emailAddress = document.getElementById("contactEmail").value;

    console.log(document.cookie)
    let payload = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        emailAddress: emailAddress,
        userId
    }

    console.log(payload)

    if (!validateForm(payload)) {
        console.log("INVALID FIRST NAME, LAST NAME, PHONE, OR EMAIL SUBMITTED")
        return
    }

    const jsonPayload = JSON.stringify(tmp)


    let newRequest = new XMLHttpRequest()
    newRequest.open("POST", `${baseURL}/AddContact.php`, true)
    newRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8")
    try {
        newRequest.send(jsonPayload)
        newRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("addResult").innerHTML = "Contact has been added"
                // clear input fields in form 
                document.getElementById("addMe").reset()
                // reload contacts table and switch view to show
                modal.style.display = "none"
                loadContacts()
            }
        };
        
    } catch (err) {
        console.log(err.message)
    }
}

validateForm = (newC) => {
    const { firstName, lastName, emailAddress, phoneNumber } = newC

    if (firstName == "") {
        console.log("First name is blank")
        return false
    }
    if (lastName == "") {
        console.log("Last name is blank")
        return false
    }
    if (phoneNumber == "") {
        console.log("Phone is blank")
        return false
    }

    let regex = /^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/

    if (regex.test(phoneNumber) == false) {
        console.log("Phone is not valid")
        return false
    }



    if (emailAddress == "") {
        console.log("Email is blank")
        return false
    }

    regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (regex.test(emailAddress) == false) {
        console.log("Email is not valid")
        return false
    }


    return true;
}