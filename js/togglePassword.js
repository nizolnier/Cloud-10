const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", () => {
	// toggle the type attribute
	if (password.getAttribute("type") === "password") {
		password.setAttribute("type", "text");
	} else {
		password.setAttribute("type", "password");
	}
});