// svg wave animation for login screen
const waveFlow = KUTE.fromTo(
  "#visual",
  {path: "#visual"},
  { path: "#visual2"},
  {repeat: 999, duration: 20000, yoyo: true}
);

waveFlow.start();

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

