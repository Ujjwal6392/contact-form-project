const nam = document.querySelector("#name");
const namErr = document.querySelector("#nameError");
const ema = document.querySelector("#email");
const emaErr = document.querySelector("#emailError");
const mes = document.querySelector("#message");
const mesError = document.querySelector("#messageError");
const submitBtn = document.querySelector("#btn");
submitBtn.disabled = true;
nam.addEventListener("input", () => {
  validateName();
  checkForm();
});

ema.addEventListener("input", () => {
  validateEmail();
  checkForm();
});

mes.addEventListener("input", () => {
  validateMessage();
  checkForm();
});

function validateName() {
  const nameVal = nam.value.trim();
  const namePattern = /^[A-Za-z\s]+$/;
  if (nameVal === "") {
    namErr.textContent = "Name is required";
    namErr.style.color = "red";
    return false;
  } else if (!namePattern.test(nameVal)) {
    namErr.textContent = "Only letters and spaces are allowed";
    namErr.style.color = "red";
    return false;
  } else {
    namErr.textContent = "✓ Valid name";
    namErr.style.color = "green";
    return true;
  }
}
function validateEmail() {
  const emailVal = ema.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailVal === "") {
    emaErr.textContent = "Email is required";
    emaErr.style.color = "red";
    return false;
  } else if (!emailPattern.test(emailVal)) {
    emaErr.textContent = "Please enter a valid email address";
    emaErr.style.color = "red";
    return false;
  } else {
    emaErr.textContent = "✓ Valid email";
    emaErr.style.color = "green";
    return true;
  }
}
function validateMessage() {
  const messageVal = mes.value.trim();
  if (messageVal === "") {
    mesError.textContent = "Message is required";
    mesError.style.color = "red";
    return false;
  } else if (messageVal.length < 10) {
    mesError.textContent = "Message must be at least 10 characters";
    mesError.style.color = "red";
    return false;
  } else {
    mesError.textContent = "✓ Valid message";
    mesError.style.color = "green";
    return true;
  }
}

function checkForm() {
  if (validateEmail() && validateName() && validateMessage()) {
    const formDetail = {
      name: nam.value,
      email: ema.value,
      subject: document.querySelector("#subject").value,
      message: mes.value,
    };
    localStorage.setItem("formDraft", JSON.stringify(formDetail));

    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}
const form = document.querySelector("form");
const spinner = document.querySelector("#spinner");
const feedback = document.querySelector("#formFeedback");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  spinner.style.display = "inline-block";
  setTimeout(() => {
    spinner.style.display = "none";

    const isSucess = Math.random() > 0.3;

    if (isSucess) {
      feedback.textContent = "✅ Your message has been sent!";
      feedback.style.color = "green";
      form.reset();
      localStorage.removeItem("formDraft");

      namErr.textContent = "";
      emaErr.textContent = "";
      mesError.textContent = "";

      submitBtn.disabled = true;

      setTimeout(() => {
        feedback.textContent = "";
      }, 4000);
    } else {
      feedback.textContent = "❌ Something went wrong. Please try again.";
      feedback.style.color = "red";
      submitBtn.disabled = false;
    }
  }, 2000);
});
window.addEventListener("DOMContentLoaded", () => {
  const savedDraft = localStorage.getItem("formDraft");
  if (savedDraft) {
    const { name, email, subject, message } = JSON.parse(savedDraft);
    nam.value = name || "";
    ema.value = email || "";
    document.querySelector("#subject").value = subject || "";
    mes.value = message || "";

    validateName();
    validateEmail();
    validateMessage();
    checkForm();
  }
});
