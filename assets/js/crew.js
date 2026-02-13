let crew = document.getElementById("crew");
let memberTemp = document.getElementById("memberTemp");

function renderMembers(members) {
  members.map((member) => {
    let memClone = memberTemp.content.cloneNode(true);

    let memLink = memClone.querySelector(".link");
    memLink.setAttribute("href", `${member.link}`);

    let memImage = memClone.querySelector(".image");
    memImage.setAttribute("src", `${member.image}`);

    let memName = memClone.querySelector(".name");
    memName.innerText = `${member.firstName} ${member.lastName}`;

    let memPos = memClone.querySelector(".position");
    memPos.innerText = `${member.position}`;

    crew.append(memClone);
  });
}

async function loadCrew() {
  let res = await fetch("./assets/data/members.json");
  let data = await res.json();
  let members = await data.members;

  renderMembers(members);
}

loadCrew();
