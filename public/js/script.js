console.log("Hej från JS")

document.getElementById("pageHeader").innerHTML = "Express FTW!"

const userList = document.getElementById("userList");

fetch("http://localhost:3010/list")
.then(res => res.json())
.then(data => {
   for (user in data) {
       userList.insertAdjacentHTML("beforeend", `<li>${data[user].name}</li>`);
   }
})