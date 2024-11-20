//   const displayInfo = () => {
//     const xhttp = new XMLHttpRequest();
//   xhttp.onload = function() {
//     document.getElementById("demo").innerHTML = this.responseText;
//   }
//   xhttp.open("GET", '/M00915023/users');
//   xhttp.send();
// }
// const sexInput = document.querySelector("#sex");


document.getElementById("button").addEventListener("click", async () => {

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

