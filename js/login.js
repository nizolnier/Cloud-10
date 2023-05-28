function showReg(){
    var login = document.getElementById("loginicon");
    var reg = document.getElementById("signupicon");
    var form =document.getElementById("form");
    var inputLog = document.getElementById("inputLog");
    var inputSign = document.getElementById("inputSignUp");

    login.style.pointerEvents="auto";
    login.style.backgroundColor="transparent";
    login.style.border="0";
    login.style.color="white";

    reg.style.pointerEvents="none";
    reg.style.backgroundColor="white";
    reg.style.border="0";
    reg.style.borderTop="2px solid #a700d0";
    reg.style.borderRadius="20px 0 0 0";
    reg.style.color="black";

    form.style.height="663px";

    inputLog.style.display="none";
    inputSign.style.display="block";

}
function showLog(){
    var login = document.getElementById("loginicon");
    var reg = document.getElementById("signupicon");
    var form =document.getElementById("form");
    var inputLog = document.getElementById("inputLog");
    var inputSign = document.getElementById("inputSignUp");


    login.style.pointerEvents="none";
    login.style.backgroundColor="white";
    login.style.border="0";
    login.style.borderTop="2px solid #a700d0";
    login.style.borderRadius="0 20px 0 0";
    login.style.color="black";

    reg.style.pointerEvents="auto";
    reg.style.backgroundColor="transparent";
    reg.style.border="0";
    reg.style.color="white";

    form.style.height="550px";
    
    inputLog.style.display="block";
    inputSign.style.display="none";
}
