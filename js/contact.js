const form = document.querySelector("#contact-form");
form.onsubmit = (event) => {
  // prevents default submission
  event.preventDefault();
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const subject = document.querySelector("#subject");
  const textArea = document.querySelector("#textarea");
};

const errorsContainer = document.querySelector("#errors");
const success = document.querySelector("#success");
let hasErrors = false;
