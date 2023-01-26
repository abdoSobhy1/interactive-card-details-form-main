let inputs = document.querySelectorAll("input");
inputs.forEach((inp) => {
  inp.addEventListener("keyup", () => {
    if (inp.value.length > inp.maxLength) {
      inp.value = inp.value.slice(0, inp.maxLength);
    }
  });
  inp.onfocus = () => inp.parentElement.classList.add("focused");
  inp.onblur = () => inp.parentElement.classList.remove("focused");
});
let cvcIn = document.querySelector("#cvc");
let cvcOut = document.querySelector(".cvc");
cvcIn.oninput = () => {
  cvcOut.innerHTML = "0".repeat(3 - cvcIn.value.length) + cvcIn.value;
};
let monthIn = document.querySelector(".month");
let monthOut = document.querySelector(".mm");
let yearIn = document.querySelector(".year");
let yearOut = document.querySelector(".yy");

monthIn.onkeyup = () => {
  monthOut.innerHTML = "0".repeat(2 - monthIn.value.length) + monthIn.value;
};
yearIn.onkeyup = () => {
  yearOut.innerHTML = "0".repeat(2 - yearIn.value.length) + yearIn.value;
};

let cardIn = document.querySelector("#number");
let cardOut = document.querySelector(".card-number");
cardIn.onkeyup = (e) => {
  if (
    (cardIn.value.length == 4 ||
      cardIn.value.length == 9 ||
      cardIn.value.length == 14 ||
      e.which == 32) &
    (e.which !== 8)
  ) {
    e.preventDefault();
  }
  if (
    (cardIn.value.length == 4 ||
      cardIn.value.length == 9 ||
      cardIn.value.length == 14) &&
    e.which !== 8
  ) {
    cardIn.value = cardIn.value + " ";
  }
  let x = cardIn.value;
  cardOut.innerHTML = "";
  cardOut.innerHTML += x;
  for (let j = x.length; j < 19; j++) {
    if (j == 4 || j == 9 || j == 14) {
      cardOut.innerHTML += " ";
    } else {
      cardOut.innerHTML += 0;
    }
  }
  checkNumbers(cardIn.value);
};
cardIn.onkeydown = (e) => {
  if (e.which === 8) {
    if (cardIn.value[cardIn.value.length - 1] == " ") {
      e.preventDefault();
      let x = cardIn.value;
      cardIn.value = x.slice(0, -2);
    }
  }
};
let nameIn = document.querySelector("#name");
let nameOut = document.querySelector(".name");
nameIn.onkeyup = () => {
  nameOut.innerHTML = nameIn.value.toUpperCase();
};
let cN;
function checkNumbers(field) {
  field.split("").map((num) => {
    cN = true;
    if (isNaN(parseInt(num))) {
      if (num != " ") {
        cN = false;
      }
    }
  });
  if (field.length < 19) {
    cN = false;
    document.querySelector(".ch-number .error").innerHTML =
      "Enter Valid Credit Card Number";
  }
}
let success = document.querySelector(".complete");
document.forms[0].onsubmit = function (e) {
  e.preventDefault();
  formValidate();
  if (formValid) {
    this.style.opacity = 0;
    this.style.scale = 0;
    success.style.display = "block";
    setTimeout(() => {
      this.style.display = "none";
      success.classList.add("completion");
    });
  }
};

let back = document.querySelector(".done");
back.onclick = function () {
  nameIn.value = "";
  cardIn.value = "";
  monthIn.value = "";
  yearIn.value = "";
  cvcIn.value = "";
  nameOut.innerHTML = "AbdelRahman Sobhy";
  cardOut.innerHTML = "0000 0000 0000 0000";
  monthOut.innerHTML = "00";
  yearOut.innerHTML = "00";
  cvcOut.innerHTML = "000";
  formValid = false;
  success.classList.remove("completion");
  document.forms[0].style.display = "block";
  setTimeout(() => {
    success.style.display = "none";
    document.forms[0].style.opacity = 1;
    document.forms[0].style.scale = 1;
  });
};
let formValid = false;
let numberError = document.querySelector(".ch-number .error");
function formValidate() {
  let numberValid = false;
  let monthValid = false;
  let yearValid = false;
  let cvcValid = false;
  checkNumbers(cardIn.value);
  if (!cN) {
    document.querySelector(".ch-number").classList.add("error");
    numberValid = false;
  } else {
    document.querySelector(".ch-number").classList.remove("error");
    numberValid = true;
  }

  if (monthIn.value.trim() == "") {
    monthIn.style.borderColor = "hsl(0, 100%, 66%)";
    document.querySelector(".date .error").style.opacity = 1;
    monthValid = false;
  } else {
    monthIn.style.borderColor = "hsl(270, 3%, 87%)";
    document.querySelector(".date .error").style.opacity = 0;
    monthValid = true;
    if (parseInt(monthIn.value) > 12 || parseInt(monthIn.value) < 1) {
      monthValid = false;
      document.querySelector(".various-errors").innerHTML = "Enter Valid Month";
      document.querySelector(".various-errors").style.opacity = 1;
    } else {
      monthValid = true;
      document.querySelector(".various-errors").style.opacity = 0;
    }
  }
  if (yearIn.value.trim() == "") {
    yearIn.style.borderColor = "hsl(0, 100%, 66%)";
    document.querySelector(".date .error").style.opacity = 1;
    yearValid = false;
  } else {
    yearIn.style.borderColor = "hsl(270, 3%, 87%)";
    document.querySelector(".date .error").style.opacity = 0;
    yearValid = true;
    const d = new Date();
    let year = d.getFullYear();
    if (parseInt(yearIn.value) < year - 2000) {
      yearValid = false;
      document.querySelector(".various-errors").innerHTML = "Enter Valid year";
      document.querySelector(".various-errors").style.opacity = 1;
    } else {
      yearValid = true;
      document.querySelector(".various-errors").style.opacity = 0;
    }
  }
  if (cvcIn.value.trim() == "") {
    document.querySelector(".cvc-sec").classList.add("error");
    cvcValid = false;
  } else {
    document.querySelector(".cvc-sec").classList.remove("error");
    cvcValid = true;
  }
  if (numberValid && monthValid && yearValid && cvcValid) {
    formValid = true;
  }
}
