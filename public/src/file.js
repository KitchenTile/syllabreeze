  const displayInfo = () => {
    const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    document.getElementById("demo").innerHTML = this.responseText;
  }
  xhttp.open("GET", '/M00915023/users');
  xhttp.send();
}