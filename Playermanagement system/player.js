const URL = "https://6790980caf8442fd7376e029.mockapi.io/api/player/ajay";
let playerList;
let tempList;

let startIndex = 0;
const fetchPlayer = async () => {
  let response = await fetch(URL);
  playerList = await response.json();
  console.log(playerList);
  pagination(startIndex, playerList);

  document.getElementById("total").innerText = playerList.length;
  tempList = playerList;
};
fetchPlayer();

const Next = () => {
  startIndex = startIndex + 5;

  pagination(startIndex, tempList);
};

const Prev = () => {
  if (startIndex > 0) {
    startIndex = startIndex - 5;

    pagination(startIndex, tempList);
  }
};

function pagination(index, arrayList) {
  const playerlist = document.querySelector("#playerlist");
  playerlist.innerHTML = "";
  for (let i = index; i < index + 5; i++) {
    playerlist.innerHTML += ` <tr>
              <th scope="row">${i + 1}</th>
              <td >${arrayList[i].name}</td>
              <td>${arrayList[i].age}</td>
               <td>${arrayList[i].position}</td>
                <td>${arrayList[i].performance}</td>
                 <td>${arrayList[i].team}</td>
                 <td ><button onclick="editplayer(${i})" class="btn btn-primary" style="margin-right:5px;border-radius:50px " >Edit</button>

                 <button onclick="deleteplayer(${i})" class="btn btn-danger" style="border-radius:50px;border:none;">Delete</button></td>
            </tr>

`;
  }
}

let newElement;
const addplayer = () => {
  const player = document.querySelector(".main");
  newElement = document.createElement("div");

  const innerhtml = `
  <form onsubmit ="formdata(event)">

  <div class="mb-3">
    <button type="button" onclick = "document.querySelector('.main').removeChild(newElement)">X</button>
  </div>

  <div class="mb-3">
    <label for="namej" class="form-label">Name</label>
    <input type="text" class="form-control" id="namej" value="">
  </div>
  <div class="mb-3">
    <label for="age" class="form-label">Age</label>
    <input type="text" class="form-control" id="age">
  </div>

  <div class="mb-3">
    <label for="performance" class="form-label">Peformance</label>
    <input type="text" class="form-control" id="performance">
  </div>

  <div class="mb-3">
    <label for="position" class="form-label">Position</label>
    <input type="text" class="form-control" id="position">
  </div>

  <div class="mb-3">
    <label for="Team" class="form-label">Team</label>
    <input type="text" class="form-control" id="Team">
  </div>
 
  <button type="submit" class="btn btn-primary">Add</button>
</form>
`;
  newElement.style.padding = "10px";
  newElement.style.height = "550px";
  newElement.style.background = "rgb(29, 27, 27)";
  newElement.style.color = "white";
  newElement.style.borderRadius = "10px";

  newElement.style.left = "260px";
  newElement.style.top = "0px";
  newElement.style.zIndex = 10000;
  newElement.style.position = "absolute";
  newElement.style.width = "50%";
  newElement.innerHTML = innerhtml;
  player.appendChild(newElement);
};

const formdata = (event) => {
  event.preventDefault();
  const name = document.querySelector("#namej").value;
  const age = document.querySelector("#age").value;
  const performance = document.querySelector("#performance").value;
  const position = document.querySelector("#position").value;
  const team = document.querySelector("#Team").value;
  const playerdata = {
    id: Math.random(),
    name: name,
    age: age,
    performance: performance,
    position: position,
    team: team,
  };

  playerList.pop();
  playerList.unshift(playerdata);
  player = document.querySelector(".main");
  document.querySelector(".main").removeChild(newElement);
  pagination(0, playerList);
};

const deleteplayer = (index) => {
  playerList.splice(index, 1);
  console.log(playerList);
  pagination(startIndex, playerList);
};

let newelement;
document.querySelector(".criteria").addEventListener("change", (e) => {
  newelement = document.createElement("div");
  newelement.style.height = "200px";
  newelement.style.width = "200px";
  newelement.style.background = "rgb(29, 27, 27)";
  newelement.style.left = "500px";
  newelement.style.top = "100px";
  newelement.style.position = "absolute";
  newelement.style.zIndex = "1000";
  newelement.style.color = "white";
  newelement.style.borderRadius = "10px";
  let innerhtml;
  if (e.target.value === "age") {
    innerhtml = ` 
    <li style="list-style:none"><button onclick="filterage(${20},${25})" class="my-1 btn btn-secondary" style="width:100%" type="button">20-25</button></li>
    <li style="list-style:none"><button onclick="filterage(${25},${30})" class="my-1 btn btn-secondary" style="width:100%" type="button">25-30</button></li>
    <li style="list-style:none"><button onclick="filterage(${30},${35})" class="my-1 btn btn-secondary" style="width:100%"  type="button">30-35</button></li>
  `;
  } else if (e.target.value === "perfromance") {
    innerhtml = ` 
  <li style="list-style:none"><button onclick="filterperformance('Excellent')" class="my-1 btn btn-secondary" style="width:100%" type="button">Excellent</button></li>
  <li style="list-style:none"><button onclick="filterperformance('Very good')" class="my-1 btn btn-secondary" style="width:100%" type="button">Very Good</button></li>
  <li style="list-style:none"><button onclick="filterperformance('Good')" class="my-1 btn btn-secondary" style="width:100%"  type="button">Good</button></li>
  <li style="list-style:none"><button onclick="filterperformance('Average')" class="my-1 btn btn-secondary" style="width:100%"  type="button">Average</button></li>
`;
  } else if (e.target.value === "position") {
    innerhtml = ` 
    <li style="list-style:none"><button onclick="filterposition('Midfielder')" class="my-1 btn btn-secondary" style="width:100%" type="button">Midfielder</button></li>
    <li style="list-style:none"><button onclick="filterposition('Defender')" class="my-1 btn btn-secondary" style="width:100%" type="button">Defender</button></li>
    <li style="list-style:none"><button onclick="filterposition('Forward')" class="my-1 btn btn-secondary" style="width:100%"  type="button">Forward'</button></li>
    <li style="list-style:none"><button onclick="filterposition('Goalkeeper')" class="my-1 btn btn-secondary" style="width:100%"  type="button">Goal Keeper</button></li>
  `;
  }

  newelement.innerHTML = innerhtml;
  document.body.appendChild(newelement);
});

const filterage = (lower, upper) => {
  tempList = playerList.filter((element) => {
    return element.age >= lower && element.age <= upper;
  });
  console.log(tempList);
  if (tempList) document.body.removeChild(newelement);

  pagination(0, tempList);
};

const filterperformance = (performance) => {
  tempList = playerList.filter((element) => {
    return element.performance === performance;
  });

  if (newelement) document.body.removeChild(newelement);

  pagination(0, tempList);
};
const filterposition = (position) => {
  tempList = playerList.filter((element) => {
    return element.position === position;
  });

  if (newelement) document.body.removeChild(newelement);

  pagination(0, tempList);
};

const editplayer = (id) => {
  const player = document.querySelector(".main");
  newElement = document.createElement("div");

  const innerhtml = `
  <form  onsubmit = "edit(event,${id})">

  <div class="mb-3">
    <button type="button" onclick = "document.querySelector('.main').removeChild(newElement)">X</button>
  </div

  <div class="mb-3">
    <label for="name1" class="form-label">Name</label>
    <input type="text" class="form-control" id="name1" aria-describedby="emailHelp" value = ${playerList[id].name}>
  </div>
  <div class="mb-3">
    <label for="age" class="form-label">Age</label>
    <input type="text" class="form-control" id="age1" value = ${playerList[id].age}>
  </div>

  <div class="mb-3">
    <label for="performance1" class="form-label">Peformance</label>
    <input type="text" class="form-control" id="performance1" value = ${playerList[id].performance}>
  </div>

  <div class="mb-3">
    <label for="position1" class="form-label">Position</label>
    <input type="text" class="form-control" id="position1" value = ${playerList[id].position}>
  </div>

  <div class="mb-3">
    <label for="team1" class="form-label">Team</label>
    <input type="text" class="form-control" id="team1" value = ${playerList[id].team}>
  </div>
 
  <button type="submit"  class="btn btn-primary">Edit</button>
</form>
`;
  newElement.style.padding = "10px";
  newElement.style.height = "550px";
  newElement.style.background = "rgb(29, 27, 27)";
  newElement.style.color = "white";
  newElement.style.borderRadius = "10px";
  newElement.innerHTML = innerhtml;
  newElement.style.left = "260px";
  newElement.style.top = "0px";
  newElement.style.zIndex = 10000;
  newElement.style.position = "absolute";
  newElement.style.width = "50%";
  player.appendChild(newElement);
};

const edit = (event, id) => {
  event.preventDefault();

  const name = document.querySelector("#name1").value;
  const age = document.querySelector("#age1").value;
  const performance = document.querySelector("#performance1").value;
  const position = document.querySelector("#position1").value;
  const team = document.querySelector("#team1").value;

  playerList.splice(id, 1, {
    name: name,
    age: age,
    performance: performance,
    position: position,
    team: team,
  });
  console.log(playerList);
  if (newElement) document.querySelector(".main").removeChild(newElement);
  pagination(startIndex, playerList);
};
