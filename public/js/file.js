const passwordInput = document.getElementById('password');
const fNameInput = document.getElementById('fName');
const emailInput = document.getElementById("email");
const usernameInput = document.getElementById("username");


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

//Display carousel 

const haikuCarousel = () => {
  const carouselSlidesDiv = document.querySelector("#carouselSlides");

  haikuData.forEach((haiku,index) => {
      carouselSlidesDiv.innerHTML += `
      <div class="haikuContainer ${index === 0 ? "center" : "side"}" id="haiku_${index}">
        <h2>${haiku.sentence1}</h2>
        <h2>${haiku.sentence2}</h2>
        <h2>${haiku.sentence3}</h2>
      </div>
    `;
  });

  let activeHaiku = 0;

  const centerChange = () => {
  
    const slides = document.querySelectorAll('.haikuContainer');
          
    slides[activeHaiku].classList.remove("center");
    slides[activeHaiku].classList.add("side");

    activeHaiku = (activeHaiku + 1) % haikuData.length;
  
    slides[activeHaiku].classList.add("center");
    slides[activeHaiku].classList.remove("side");

    const offset = -activeHaiku * 65;
    carouselSlidesDiv.style.transform = `translateX(${offset}%)`;
  }
  
  setInterval(centerChange, 5000);

}

haikuCarousel();

//input class change with for loop
const inputList = ["fName", "email", "username", "password"]
for (let i = 0; i < inputList.length; i++){
  const input = document.querySelector(`#${inputList[i]}`);
  input.addEventListener("input", () => {
    if (input.value) {
      input.parentElement.classList.add("filled");
    } else {
      input.parentElement.classList.remove("filled"); 
    }
  })
}


//password valid
passwordInput.addEventListener('input',  function() {
  const password = this.value;

  //set the conditions for the password being valid
  if (password.length >= 8 && password.charCodeAt(password.length-1) > 47 && password.charCodeAt(password.length-1) < 58) {
      document.getElementById("password").setAttribute("style", "border-color:#3e733a");
      document.getElementById("passwordSymbol").innerHTML = " ✓"
      passwordValid = true;
  } else {
    document.getElementById("password").setAttribute("style", "border-color:#720000");
    document.getElementById("passwordSymbol").innerHTML = " 𐄂"
    passwordValid = false;
  }
});


//full name valid
fNameInput.addEventListener('input',  function() {
  const fName = this.value;

  //if name is not empty, then it's valid
  if (fName !== "") {
    document.getElementById("fName").setAttribute("style", "border-color:#3e733a");
    document.getElementById("fNameSymbol").innerHTML = " ✓"
    fNameValid = true;
  } else {
    document.getElementById("fName").setAttribute("style", "border-color:#720000");
    document.getElementById("fNameSymbol").innerHTML = " 𐄂"
    fNameValid = false;
  }
});

//email valid
emailInput.addEventListener("input", function () {
  const email = this.value;

      //set the conditions for the email being valid
  if (email.length >= 11 && email.includes("@") && email.includes(".com")) {
    document.getElementById("email").setAttribute("style", "border-color:#3e733a");
    document.getElementById("emailSymbol").innerHTML = " ✓"
      emailValid = true;
      console.log(emailValid);
  } else {
    document.getElementById("email").setAttribute("style", "border-color:#720000");
    document.getElementById("emailSymbol").innerHTML = " 𐄂"  
    emailValid = false;
  }
})

//username valid
usernameInput.addEventListener('input',  function() {
  const username = this.value;

  //if username is not empty, then it's valid
  if (username !== "") {
    document.getElementById("username").setAttribute("style", "border-color:#3e733a");
    document.getElementById("usernameSymbol").innerHTML = " ✓"
    usernameValid = true;
  } else {
    document.getElementById("username").setAttribute("style", "border-color:#720000");
    document.getElementById("usernameSymbol").innerHTML = " 𐄂"
    usernameValid = false;
  }
});

// submit user signup
document.querySelector(".button").addEventListener("click", async (event) => {
  event.preventDefault();

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
        console.log(error)
      }
  } 

});