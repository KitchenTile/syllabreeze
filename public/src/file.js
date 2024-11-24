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
    "sentence2": "fingers dance on wooden frets,",
    "sentence3": "notes fall like raindrops."
  },
  {
    sentence1: "Silent peaks stand tall,",
    "sentence2": "ancient stones bathed in cool light,",
    "sentence3": "Touching endless skies."
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
    console.log(activeHaiku);
  
    slides[activeHaiku].classList.add("center");
    slides[activeHaiku].classList.remove("side");

    const offset = -activeHaiku * 65;
    carouselSlidesDiv.style.transform = `translateX(${offset}%)`;
  }
  
  setInterval(centerChange, 5000);

}




haikuCarousel();




//input class change with for loop for scalability
const inputList = ["fName","lName","email", "password"]
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

// submit user signup
document.getElementById("createform").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formInfo = new FormData(document.getElementById("createForm"));
  const data = Object.fromEntries(formInfo.entries());

  console.log(data);

  try {
    
    await fetch(`/M00915023/create`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

  } catch (err) {
    console.log(err)
    }
})

