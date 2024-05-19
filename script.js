const generateBtn = document.querySelector(".generate");
const resetBtn = document.querySelector(".reset");
const copyBtn = document.querySelector(".copy");
const paraPwd = document.querySelector("span");
const pwdValue = document.querySelector("#number");
const uppercaseCheckbox = document.querySelector("#uppercase");
const lowercaseCheckbox = document.querySelector("#lowercase");
const numbersCheckbox = document.querySelector("#numbers");
const symbolsCheckbox = document.querySelector("#symbols");
const strengthIndicator = document.querySelector(".strength");

let pwdLength;

generateBtn.addEventListener("click", () => {
  pwdLength = Number(pwdValue.value);

  let characters = "";
  if (uppercaseCheckbox.checked) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lowercaseCheckbox.checked) characters += "abcdefghijklmnopqrstuvwxyz";
  if (numbersCheckbox.checked) characters += "0123456789";
  if (symbolsCheckbox.checked) characters += "@#$&é,?;/:è_çà+*";

  let pass = "";
  for (let i = 0; i < pwdLength; i++) {
    let char = Math.floor(Math.random() * characters.length);
    pass += characters.charAt(char);
  }

  paraPwd.textContent = pass;
  evaluateStrength(pass);
});

resetBtn.addEventListener("click", () => {
  paraPwd.textContent = "";
  pwdValue.value = 16;
  uppercaseCheckbox.checked = true;
  lowercaseCheckbox.checked = true;
  numbersCheckbox.checked = true;
  symbolsCheckbox.checked = true;
  strengthIndicator.textContent = "";
});

copyBtn.addEventListener("click", () => {
  const password = paraPwd.textContent;
  navigator.clipboard.writeText(password).then(() => {
    alert("Mot de passe copié dans le presse-papiers !");
  });
});

function evaluateStrength(password) {
  let strength = "Faible";
  const regexes = [/[A-Z]/, /[a-z]/, /[0-9]/, /[@#$&é,?;/:è_çà+*]/];
  let passed = regexes.filter((regex) => regex.test(password)).length;

  if (passed === 4 && password.length >= 16) {
    strength = "Fort";
  } else if (passed >= 3 && password.length >= 12) {
    strength = "Moyen";
  }

  if (strength === "Fort") {
    strengthIndicator.textContent = strength;
    strengthIndicator.style.color = "green";
  } else if (strength === "Moyen") {
    strengthIndicator.textContent = strength;
    strengthIndicator.style.color = "orange";
  } else {
    strengthIndicator.textContent = strength;
    strengthIndicator.style.color = "red";
  }
}
