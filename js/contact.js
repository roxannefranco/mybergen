const form = document.querySelector("#contact-form");
form.onsubmit = (event) => {
  // prevention default submission occurs
  event.preventDefault();
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const subject = document.querySelector("#subject");
  const textArea = document.querySelector("#textarea");

  const errorsContainer = document.querySelector("#errors");
  const success = document.querySelector("#success");
  let hasErrors = false;

  // cleaning all error messages
  const errorMessage = document.querySelectorAll(".error-message");
  errorMessage.forEach(function (msg) {
    msg.innerHTML = "";
  });

  const errors = [];

  // testing name input
  if (name.value.trim().length < 5) {
    hasErrors = true;
    const nameError = document.querySelector(".name-error");
    nameError.innerHTML = "Requires at least 5 characters.";
  }

  //testing subject input
  if (subject.value.trim().length < 15) {
    hasErrors = true;
    const subjectError = document.querySelector(".subject-error");
    subjectError.innerHTML = "Requires at least 15 characters!";
  }

  // testing email inoput with regex
  const emailValue = email.value.trim();
  if (
    !emailValue.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    hasErrors = true;
    const emailError = document.querySelector(".email-error");
    emailError.innerHTML = "Please insert a valid email!";
  }

  // testing textarea input
  if (textArea.value.trim().length < 25) {
    hasErrors = true;
    const textAreaError = document.querySelector(".textarea-error");
    textAreaError.innerHTML = "Please write at least 25 characters!";
  }

  // loop to look for errors
  if (!hasErrors) {
    // no errors then display success message
    success.innerHTML = "Thanks for your message!";
    document.getElementById("contact-form").reset();
    // clean success message after submission
    setTimeout(() => {
      success.innerHTML = "";
    }, 5000);
  }
};
