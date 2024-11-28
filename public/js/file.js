import displayLoginPage from "./pages/login.js";

displayLoginPage();

//register inputs
const passwordInput = document.getElementById('regPassword');
const fNameInput = document.getElementById('fName');
const emailInput = document.getElementById("regEmail");
const usernameInput = document.getElementById("username");

//login inputs
const loginEmailInput = document.getElementById("loginEmail");
const loginPasswordInput = document.getElementById("loginPassword");




const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");


let passwordValid = false;
let fNameValid = false;
let emailValid = false;
let usernameValid = false;

// svg wave animation for login screen
const waveFlow = KUTE.fromTo(
  "#visual",
  {path: "#visual"},
  { path: "#visual2"},
  {repeat: 999, duration: 20000, yoyo: true, easing: "linear"}
);

waveFlow.start();

//Haiku data 

const haikuData = [
  {
    sentence1: "Gentle leaves cascade,",
    sentence2: "Autumn whispers through the trees",
    sentence3: "Colors drift like dreams."
  },
  {
    sentence1: "Strings hum soft and low,",
    sentence2: "fingers dance on wooden frets,",
    sentence3: "notes fall like raindrops."
  },
  {
    sentence1: "Silent peaks stand tall,",
    sentence2: "ancient stones bathed in cool light,",
    sentence3: "Touching endless skies."
  },
];

//use toggle

document.getElementById("show-register").addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.classList.add("visible");
  loginForm.classList.remove("visible");
  toggleInputs(["fName", "regEmail", "username", "regPassword"]);
});

document.getElementById("show-login").addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("visible");
  registerForm.classList.remove("visible");
  toggleInputs(["loginEmail", "loginPassword"])
});

//Display carousel 

// const haikuCarousel = () => {
//   const carouselSlidesDiv = document.querySelector("#carouselSlides");

//   haikuData.forEach((haiku,index) => {
//       carouselSlidesDiv.innerHTML += `
//       <div class="haikuContainer ${index === 0 ? "center" : "side"}" id="haiku_${index}">
//         <h2>${haiku.sentence1}</h2>
//         <h2>${haiku.sentence2}</h2>
//         <h2>${haiku.sentence3}</h2>
//       </div>
//     `;
//   });

//   let activeHaiku = 0;

//   const centerChange = () => {
  
//     const slides = document.querySelectorAll('.haikuContainer');
          
//     slides[activeHaiku].classList.remove("center");
//     slides[activeHaiku].classList.add("side");

//     activeHaiku = (activeHaiku + 1) % haikuData.length;
  
//     slides[activeHaiku].classList.add("center");
//     slides[activeHaiku].classList.remove("side");

//     const offset = -activeHaiku * 65;
//     carouselSlidesDiv.style.transform = `translateX(${offset}%)`;
//   }
  
//   setInterval(centerChange, 5000);

// }

// haikuCarousel();


//for each element in input list listen to inputs and toggle class

const toggleInputs = (inputs) => {

  const inputIdList = inputs;
  console.log(inputIdList);

  inputIdList.forEach(id => {
      const input = document.getElementById(id);
      input.addEventListener("input", () => {
        if (input.value) {
          input.parentElement.classList.add("filled");
        } else {
          input.parentElement.classList.remove("filled")
        }
      })
  });
}

toggleInputs(["loginEmail", "loginPassword"])

// -- VISUAL VALIDATION --

//LOGIN

//email valid
loginEmailInput.addEventListener("input", function () {
  const email = this.value;

      //set the conditions for the email being valid
  if (email.length >= 11 && email.includes("@") && email.includes(".com")) {
    loginEmailInput.setAttribute("style", "border-color:#3e733a");
    document.getElementById("loginEmailSymbol").innerHTML = " ✓"
      emailValid = true;
      console.log(emailValid);
  } else {
    loginEmailInput.setAttribute("style", "border-color:#720000");
    document.getElementById("loginEmailSymbol").innerHTML = " 𐄂"  
    emailValid = false;
  }
})

//password valid
loginPasswordInput.addEventListener('input',  function() {
  const password = this.value;

  //set the conditions for the password being valid
  if (password.length >= 8 && password.charCodeAt(password.length-1) > 47 && password.charCodeAt(password.length-1) < 58) {
      loginPasswordInput.setAttribute("style", "border-color:#3e733a");
      document.getElementById("loginPasswordSymbol").innerHTML = " ✓"
      passwordValid = true;
  } else {
    loginPasswordInput.setAttribute("style", "border-color:#720000");
    document.getElementById("loginPasswordSymbol").innerHTML = " 𐄂"
    passwordValid = false;
  }
});

// REGISTRATION

//password valid
passwordInput.addEventListener('input',  function() {
  const password = this.value;

  //set the conditions for the password being valid
  if (password.length >= 8 && password.charCodeAt(password.length-1) > 47 && password.charCodeAt(password.length-1) < 58) {
      passwordInput.setAttribute("style", "border-color:#3e733a");
      document.getElementById("passwordSymbol").innerHTML = " ✓"
      passwordValid = true;
  } else {
    passwordInput.setAttribute("style", "border-color:#720000");
    document.getElementById("passwordSymbol").innerHTML = " 𐄂"
    passwordValid = false;
  }
});


//full name valid
fNameInput.addEventListener('input',  function() {
  const fName = this.value;

  //if name is not empty, then it's valid
  if (fName !== "") {
    fNameInput.setAttribute("style", "border-color:#3e733a");
    document.getElementById("fNameSymbol").innerHTML = " ✓"
    fNameValid = true;
  } else {
    fNameInput.setAttribute("style", "border-color:#720000");
    document.getElementById("fNameSymbol").innerHTML = " 𐄂"
    fNameValid = false;
  }
});

//email valid
emailInput.addEventListener("input", function () {
  const email = this.value;

      //set the conditions for the email being valid
  if (email.length >= 11 && email.includes("@") && email.includes(".com")) {
    emailInput.setAttribute("style", "border-color:#3e733a");
    document.getElementById("emailSymbol").innerHTML = " ✓"
      emailValid = true;
      console.log(emailValid);
  } else {
    emailInput.setAttribute("style", "border-color:#720000");
    document.getElementById("emailSymbol").innerHTML = " 𐄂"  
    emailValid = false;
  }
})

//username valid
usernameInput.addEventListener('input',  function() {
  const username = this.value;

  //if username is not empty, then it's valid
  if (username !== "") {
    usernameInput.setAttribute("style", "border-color:#3e733a");
    document.getElementById("usernameSymbol").innerHTML = " ✓"
    usernameValid = true;
  } else {
    usernameInput.setAttribute("style", "border-color:#720000");
    document.getElementById("usernameSymbol").innerHTML = " 𐄂"
    usernameValid = false;
  }
});

// submit user signup
document.getElementById("registerBttn").addEventListener("click", async (e) => {
  e.preventDefault();

  const formInfo = new FormData(document.getElementById("createForm"));
  const data = Object.fromEntries(formInfo.entries());

  console.log(data);

    if (emailValid && passwordValid && fNameValid && usernameValid) {
      try {
        await fetch(`/M00915023/users`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });
    } catch (error) {
        console.log(error);
      }
  } 
});

// submit user signup
document.getElementById("loginBttn").addEventListener("click", async (e) => {
  e.preventDefault();

  const formInfo = new FormData(document.getElementById("createForm"));
  const data = Object.fromEntries(formInfo.entries());

  console.log(data);

    if (emailValid && passwordValid) {
      try{
        await fetch(`/M00915023/login`, {
          method: "POST", 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data) 
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
);

