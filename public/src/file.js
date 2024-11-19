//   const displayInfo = () => {
//     const xhttp = new XMLHttpRequest();
//   xhttp.onload = function() {
//     document.getElementById("demo").innerHTML = this.responseText;
//   }
//   xhttp.open("GET", '/M00915023/users');
//   xhttp.send();
// }
const sexInput = document.querySelector("#sex");


document.getElementById("demo").addEventListener("click", async () => {

  const userSex = sexInput.value;

  try{
    const response = await fetch(`/M00915023/users/${userSex}`);
    if (!response.ok) {
      throw new Error("Network response failed");
    }

    const data = await response.json();

    document.getElementById('dataDisplay').innerHTML = JSON.stringify(data);

  } catch (err) {
    console.log(err)
  }
})