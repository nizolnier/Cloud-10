const baseURL = 'http://cop4331group10.xyz/LAMPAPI';
const extension = 'php';
const ids = []

logout = () => {
    userId = 0;
    firstName = "";
    lastName = "";

    document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}

showContacts = () => {
    let payload = {
        search: "",
        UserID: userId
    }

    let jsonPayload = JSON.stringify(payload);

    let url = baseURL + '/SearchContacts.' + extension;
    let newRequest = new XMLHttpRequest();
    newRequest.open("POST", url, true);
    newRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try{
        newRequest.onreadystatechange = () => {
            if(newRequest.readyState == 4 && newRequest.status == 200) {
                let jsonObject = JSON.parse(newRequest.responseText);

                if(jsonObject.error) {
                    console.log(jsonObject.error);
                    return;
                }

                let elem = "<tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone</th><th></th></tr>"
                for(let i = 0; i < jsonObject.results.length; i++) {
                    ids[i] = jsonObject.results[i].ID;
                    elem += "<tr id='row" + i + "'>"
                    elem += "<td id='firstName" + i + "'><span>" + jsonObject.results[i].FirstName + "</span></td>";
                    elem += "<td id='lastName" + i + "'><span>" + jsonObject.results[i].LastName + "</span></td>";
                    elem += "<td id='email" + i + "'><span>" + jsonObject.results[i].Email + "</span></td>";
                    elem += "<td id='phone" + i + "'><span>" + jsonObject.results[i].Phone + "</span></td>";
                    elem += "<td>" + 
                        "<button type='button' id='editBtn" + i + " onclick='editContact(" + i + ")'>" + "<img src='./images/edit.svg' alt='Edit Contact'>" + "</button>" +
                        "<button type='button' id='saveBtn" + i + "' value='Save' onclick='saveContact(" + i + ")' style='display: none'>" + "<img src='./images/save.svg' alt='Save Changes'>" + "</button>" +
                        "<button type='button' onclick='deleteContact(" + i + ")'>" + "<img src='./images/trash.svg' alt='Delete Contact'>" + "</button>" + "</td>";
                }
                document.getElementById("contactsTable").innerHTML = elem;
            }
        }
        newRequest.send(jsonPayload);
    }
    catch(err) {
        console.log(err.message);
    }

}

editContact = (id) => {
    document.getElementById("editBtn" + id).style.display = "none";
    document.getElementById("saveBtn" + id).style.display = "inline-block";

    var first = document.getElementById("firstName" + id);
    var last = document.getElementById("lastName" + id);
    var email = document.getElementById("email" + id);
    var phone = document.getElementById("phone" + id);

    var firstText = first.innerHTML;
    var lastText = last.innerHTML;
    var emailText = email.innerHTML;
    var phoneText = phone.innerHTML;

    first.innerHTML = "<input type='text' id='firstTxt" + id + "' value='" + firstText + "'>";
    last.innerHTML = "<input type='text' id='lastTxt" + id + "' value='" + lastText + "'>";
    email.innerHTML = "<input type='text' id='emailTxt" + id + "' value='" + emailText + "'>";
    phone.innerHTML = "<input type='text' id='phoneTxt" + id + "' value='" + phoneText + "'>"

}

saveContact = (num) => {
    var firstVal = document.getElementById("firstTxt" + num).value;
    var lastVal = document.getElementById("lastTxt" + num).value;
    var emailVal = document.getElementById("emailTxt" + num).value;
    var phoneVal = document.getElementById("phoneTxt" + num).value;
    var idVal = ids[num];

    document.getElementById("firstName" + num).innerHTML = firstVal;
    document.getElementById("lastName" + num).innerHTML = lastVal;
    document.getElementById("email" + num).innerHTML = emailVal;
    document.getElementById("phone" + num).innerHTML = phoneVal;

    document.getElementById("editBtn" + num).style.display = "inline-block";
    document.getElementById("saveBtn" + num).style.display = "none";

    let payload = {
        Phone: phoneVal,
        Email: emailVal,
        UserID: idVal,
        FirstName: firstVal,
        LastName: lastVal
    }

    let jsonPayload = json.stringify(payload);
    let url = baseURL + 'UpdateContacts.' + extension;

    let newRequest = new XMLHttpRequest;
    newRequest.open("POST", url, true);
    try {
        newRequest.onreadystatechange = () => {
            if (newRequest.readyState == 4 && newRequest.status == 200) {
                console.log("Contact has been updated");
                showContacts();
            }
        }
        newRequest.send(jsonPayload);
    }
    catch(error) {
        console.log(error.message);
    }

}

deleteContact = (num) => {
    var firstVal = document.getElementById("firstName" + num).innerText;
    var lastVal = document.getElementById("lastName" + num).innerText;
    var userId = ids[num]
    nameFirst = firstVal.substring(0, firstVal.length);
    nameLast = lastVal.substring(0, lastVal.length);

    let confirmation = confirm("Would you like to delete contact: " + nameFirst + " " + nameLast);
    if(confirmation === true) {
        document.getElementById("row" + num + "").outerHTML = "";

        let payload = {
            FirstName: nameFirst,
            LastName: nameLast,
            UserID: userId
        };

        let jsonPayload = JSON.stringify(payload);
        let url = baseURL + '/DeleteContact.' + extension;

        let newRequest = new XMLHttpRequest;
        newRequest.open("POST", url, true);
        newRequest.etRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            newRequest.onreadystatechange = () => {
                if(newRequest.readyState == 4 && newRequest.status == 200) {
                    console.log("Contact deleted");
                    showContacts();
                }
            }
            newRequest.send(jsonPayload);
        }
        catch(error) {
            console.log(error.message)
        }

    }

}

searchContacts = () => {
    const query = document.getElementById("search");
    const options = query.value.toUpperCase().split(' '); 
    const contactsTable = document.getElementById("contactsTable"); 
    const contactsRow = contactsTable.getElementsByTageName("tr"); 

    for(let i = 0; i < contactsRow.length; i++) {
        const tdFirstName = contactsRow[i].getElementsByTageName("td")[0];
        const tdLastName = contactsRow[i].getElementsByTagName("td")[1];

        if(tdFirstName && tdLastName) {
            const firstNameTextVal = tdFirstName.textContent || tdFirstName.innerText;
            const lastNameTextVal = tdLastName.textContent || tdLastName.innerText;
            contactsRow.style.display = "none";

            for(option of options) {
                if(firstNameTextVal.toUpperCase().indexOf(option) > -1) {
                    contactsRow[i].style.display = "";
                }
                if(lastNameTextVal.toUpperCase().indexOf(selection) > -1) {
                    contactsRow[i].style.display= "";
                }
            }
        }
    }
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
        userId: userId
    }

    console.log(payload)
    console.log(payload.userId)
    if (!validateForm(payload)) {
        console.log("INVALID FIRST NAME, LAST NAME, PHONE, OR EMAIL SUBMITTED")
        return
    }

    const jsonPayload = JSON.stringify(payload)


    let newRequest = new XMLHttpRequest()
    newRequest.open("POST", `${baseURL}/AddContact.php`, true)
    newRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8")
    try {
        newRequest.send(jsonPayload)
        newRequest.onreadystatechange = function () {
            if (newRequest.readyState == 4 && newRequest.status == 200) {
                document.getElementById("addResult").innerHTML = "Contact has been added"
                // clear input fields in form 
                document.getElementById("addMe").reset()
                // reload contacts table and switch view to show
                modal.style.display = "none"
                showContacts()
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