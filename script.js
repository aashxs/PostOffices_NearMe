let IP;
let pincode;
let latitude;
let longitude;
let array = [];

let ip_address = document.querySelector("#ip_address");
let before_click = document.getElementById("before_click");
let heading = document.getElementById("heading");
let locationDetails = document.getElementById("location");
let mapFrame = document.getElementById("mapFrame");
let more_information = document.getElementById("more_information");
let output = document.getElementById("output");
let search_postoffice = document.getElementById("search_postoffice");

let p1 = document.createElement("p");
let p2 = document.createElement("p");
let p3 = document.createElement("p");
let p4 = document.createElement("p");
let p5 = document.createElement("p");
let p6 = document.createElement("p");
let p7 = document.createElement("p");
let p8 = document.createElement("p");
let p9 = document.createElement("p");
let p10 = document.createElement("p");

document.addEventListener("DOMContentLoaded", function () {
  ipaddress();
});

async function ipaddress() {
  let response1 = await fetch("https://api.ipify.org?format=json");
  let data = await response1.json();
  IP = data.ip;
  ip_address.innerText = `YOUR CURRENT IP ADDRESS IS: ${IP}`;
  heading.innerText = `YOUR CURRENT IP ADDRESS IS: ${IP}`;

  let response2 = await fetch(`https://ipinfo.io/${IP}/geo`);
  let data1 = await response2.json();
  console.log(data1);
  let altitude = data1.loc;
  let arr = altitude.split(",");
  latitude = arr[0];
  longitude = arr[1];
  pincode = data1.postal;
  p1.innerText = `lat:${latitude}`;
  p2.innerText = `City:${data1.city}`;
  p3.innerText = `Organisation:${data1.org}`;
  p4.innerText = `Lon:${longitude}`;
  p5.innerText = `Region:${data1.region}`;
  p6.innerText = `Hostname:Ashish`;
  p7.innerText = `Time Zone:${data1.timezone}`;
  p8.innerText = `Date And Time:${new Date()}`;
  p9.innerText = `Pincode:${pincode}`;
  p10.innerText = `Message:${longitude}`;

  locationDetails.appendChild(p1);
  locationDetails.appendChild(p2);
  locationDetails.appendChild(p3);
  locationDetails.appendChild(p4);
  locationDetails.appendChild(p5);
  locationDetails.appendChild(p6);
  mapFrame.src = `https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed `;
  more_information.appendChild(p7);
  more_information.appendChild(p8);
  more_information.appendChild(p9);
  more_information.appendChild(p10);
  console.log("Ashish")
  let response3 = await fetch(
    `https://api.postalpincode.in/pincode/${pincode}`
  );
  let data3 = await response3.json();
  console.log(data3);
  console.log(data3[0].PostOffice);
  array = data3[0].PostOffice;

  renderData(array);
}

function onBtnClick() {
  before_click.style.display = "none";
  after_click.style.display = "block";
}

function renderData(array) {
  array.forEach((element) => {
    let div = document.createElement("div");
    let p11 = document.createElement("p");
    let p12 = document.createElement("p");
    let p13 = document.createElement("p");
    let p14 = document.createElement("p");
    let p15 = document.createElement("p");
    p11.innerText = `Name: ${element.Name}`;
    p12.innerText = `Branch Type: ${element.BranchType}`;
    p13.innerText = `Delivery Status: ${element.DeliveryStatus}`;
    p14.innerText = `District: ${element.District}`;
    p15.innerText = `Division: ${element.Division}`;
    div.appendChild(p11);
    div.appendChild(p12);
    div.appendChild(p13);
    div.appendChild(p14);
    div.appendChild(p15);
    output.appendChild(div);
  });
}

function search_post() {
  let searchValue = search_postoffice.value;
  let final_array = array.filter((element) =>
    element.Name.toLowerCase().includes(searchValue.toLowerCase())
  );
  output.innerHTML = "";
  renderData(final_array);
}
