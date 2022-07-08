let menu = document.querySelector(".menu-icon");
let navbar = document.querySelector(".menu");
let icn = document.querySelector(".menu-icon");

icn.addEventListener("click", function () {
    navbar.classList.toggle("active");
});
menu.addEventListener("click", function () {
    menu.classList.toggle("move")
});

// $(document).ready(function () {
//     $(".own-carousel").owlCarousel();
// })

// document.querySelector(".cardBx").innerHTML += `
// <div class="card">
// <img
//     src="">
// <div class="content">
//     <h4>PUBG</h4>
//     <div class="progres-line"></div>
//     <div class="info">
//         <p>Price<br><span>$10</span></p>
//         <a href="">About More</a>
//     </div>
// </div>
// </div>
// `


{/* <div class="card">
<img
  src="https://www.telerama.fr/sites/tr_master/files/styles/simplecrop1000/public/cyberpunk02_3_0.jpg?itok=KbMWfnMC"
/>
<div class="content">
  <h4>PUBG</h4>
  <div class="progres-line"></div>
  <div class="info">
    <p>
      Price<br />
      <span>$10</span>
    </p>
    <a href="">About More</a>
  </div>
</div>
</div> */}
filltheCard();
function filltheCard(){
    let hoempcard =document.getElementById("cardBx");
    hoempcard.innerHTML="";
    let games = JSON.parse(localStorage.getItem("games"))

    games.forEach(gameee=>{
        hoempcard.innerHTML+=`
        <div class="card">
<img
  src="${gameee.imgsrc}"
/>
<div class="content">
  <h4>${gameee.gname}</h4>
  <div class="progres-line"></div>
  <div class="info">
    <p>
      Price<br />
      <span>$${gameee.price}</span>
    </p>
    <a href="details.html?id=${gameee.id}">About More</a>
  </div>
</div>
</div>
        `
    })
}

document.getElementById("cart-icon").addEventListener("click", function () {
  document.getElementById("modalofcart").classList.add("activemodal");
})
document.getElementById("btn-close").addEventListener("click", function () {
  document.getElementById("modalofcart").classList.remove("activemodal");
})
fillTheCart();
function fillTheCart(){
  checkCart()
  let table2 =document.getElementById("cart-table");
  table2.innerHTML=`<tr>
  <th>Cart Id</th>
  <th>Game Image</th>
  <th>Game Name</th>
  <th>Price</th>
</tr>`;
let total=0;
  let carts = JSON.parse(localStorage.getItem("cart"));
  carts.forEach(carti=>{
    var btnr =document.createElement('button');
    btnr.innerHTML = "Remove";
    btnr.classList.add("remobtn");
    btnr.id = "remobtn";
    var myFloat = parseFloat(carti.iprice);
    total+=myFloat;
    var newRow = table2.insertRow(table2.rows.length),
        cell0= newRow.insertCell(0),
        cell1 = newRow.insertCell(1),
        cell2 = newRow.insertCell(2),
        cell3 = newRow.insertCell(3),
        cell4 = newRow.insertCell(4);

    cell0.innerHTML = carti.id;
    cell1.innerHTML = `<img class="imgoftablesss" src="${carti.iimgsrc}"/>`;
    cell2.innerHTML = carti.iname;
    cell3.innerHTML = carti.iprice;
    cell4.appendChild(btnr);

    btnr.onclick = function(){
        let carts2 = JSON.parse(localStorage.getItem("cart"));
        let rgameid="";
        var currentind23 = btnr.closest('tr').rowIndex;
        let cartid = table2.rows[currentind23].cells[0].innerHTML;
        carts2.forEach(cart=>{
            if(cart.id==cartid){
                rgameid= carts2.indexOf(cart);
                carts2.splice(rgameid, 1); 
              
                return;
            }
        })
       
        localStorage.setItem("cart",JSON.stringify(carts2));
        fillTheCart();
    }
  })
    document.getElementById("totalspan").innerHTML=`$${total}`;
}

function checkCart() {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart",JSON.stringify([]))
    }
  }
  fillTheCateego();
function fillTheCateego(){
    let ulofcateee = document.getElementById("ulofcates");
    ulofcateee.innerHTML="";
    let gtype = JSON.parse(localStorage.getItem("gametype"));
    gtype.forEach(gtp=>{
      ulofcateee.innerHTML+=`
          <li class="list" idoftype="${gtp.id}" >${gtp.tname}</li>
      ` 
    })
}

