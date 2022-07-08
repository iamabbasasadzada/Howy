const image_input = document.querySelector("#image-input");
var  uploaded_image="";
image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});
fillSelectbox();
document.getElementById("addgamebtn").addEventListener("click",function(){
    checkGames();
    if(!checkInputEmpt()){
    let games = JSON.parse(localStorage.getItem("games"));
    let gmname = document.getElementById("gname").value;
    let price = document.getElementById("prices").value;
    let about = document.getElementById("aboutg").value;
    let rdate = document.getElementById("rdatea").value;
    let publn = document.getElementById("publs").value;
    let platname="";
    let types ="";
    let plat = [];
    for (var option of document.getElementById('plattt').options) {
        if (option.selected) {
            plat.push(option.value);
    }}
    let typ = [];
    for (var option of document.getElementById('gtypee').options) {
        if (option.selected) {
            typ.push(option.value);
    }}

    let allplatid=JSON.parse(localStorage.getItem("platform"));
    allplatid.forEach(apid=>{
        plat.forEach(plid=>{
            if(apid.id == plid){
                platname+=","+apid.pname;
            }
        })
    })
    let typesid =JSON.parse( localStorage.getItem("gametype"));
    typesid.forEach(tid=>{
        typ.forEach(typid=>{
            if(tid.id == typid){
                types+=","+tid.tname;
            }
        })
    })
    let game={
        id : games.length+1,
        gname : gmname,
        price : price,
        imgsrc:uploaded_image,
        aboutg :about,
        rdate:rdate,
        gtype:types.substring(1),
        publ:publn,
        plat:platname.substring(1)
    }
    games.push(game)
    localStorage.setItem("games",JSON.stringify(games));
    fillpage();
    document.getElementById("gname").value = "";
    document.getElementById("prices").value = "";
    document.getElementById("aboutg").value = "";
    document.getElementById("publs").value = "";
}
})
fillpage();
function fillpage(){
    checkGames();
    let table2 =document.getElementById("game-table");
    table2.innerHTML=`<tr>
    <th>Game Id</th>
    <th>Game Image</th>
    <th>Game Name</th>
    <th>Relase Date</th>
    <th>Price</th>
    <th>Publisher</th>
    <th>Game Type</th>
    <th>Platforms</th>
    <th>Action</th>
  </tr>`;
    let games = JSON.parse(localStorage.getItem("games"));
    games.forEach(gameee=>{
    var btnr =document.createElement('button');
    btnr.innerHTML = "Remove";
    btnr.classList.add("remobtn");
    btnr.id = "remobtn";

    var newRow = table2.insertRow(table2.rows.length),
        cell0= newRow.insertCell(0),
        cell1 = newRow.insertCell(1),
        cell2 = newRow.insertCell(2),
        cell3 = newRow.insertCell(3),
        cell4 = newRow.insertCell(4),
        cell5 = newRow.insertCell(5),
        cell6 = newRow.insertCell(6),
        cell7 = newRow.insertCell(7),
        cell8 = newRow.insertCell(8);

    cell0.innerHTML = gameee.id;
    cell1.innerHTML = `<img width='100px' src="${gameee.imgsrc}"/>`;
    cell2.innerHTML = gameee.gname;
    cell3.innerHTML = gameee.rdate;
    cell4.innerHTML = gameee.price;
    cell5.innerHTML = gameee.publ;
    cell6.innerHTML = gameee.gtype;
    cell7.innerHTM =gameee.plat;
    cell8.appendChild(btnr);

    btnr.onclick = function(){
        let games2 = JSON.parse(localStorage.getItem("games"));
        let rgameid="";
        var currentind23 = btnr.closest('tr').rowIndex;
        let gamid = table2.rows[currentind23].cells[0].innerHTML;
        games2.forEach(gameesa=>{
            if(gameesa.id==gamid){
                rgameid= games2.indexOf(gameesa);
                games2.splice(rgameid, 1); 
              
                return;
            }
        })
       
        localStorage.setItem("games",JSON.stringify(games2));
        fillpage();
    }
    })
}

function checkGames() {
    if (!localStorage.getItem("games")) {
      localStorage.setItem("games",JSON.stringify([]))
    }
  }

function fillSelectbox(){
    checkPlatforms();
    checkGameType();
    let selectbgamety=document.getElementById("gtypee");
    let selectbplat =document.getElementById("plattt");
    selectbgamety.innerHTML="";
    selectbplat.innerHTML="";
    let allplatid=JSON.parse(localStorage.getItem("platform"));
    allplatid.forEach(plat=>{
        selectbplat.innerHTML+=`
        <option value="${plat.id}">${plat.pname}</option>
        `;
    })
    let typesid =JSON.parse( localStorage.getItem("gametype"));
    typesid.forEach(typessa=>{
        selectbgamety.innerHTML+=`
        <option value="${typessa.id}">${typessa.tname}</option>
        `;
    })
}

function checkInputEmpt(){
    let isEmpty = false;
    let gmname = document.getElementById("gname").value;
    let price = document.getElementById("prices").value;
    let about = document.getElementById("aboutg").value;
    let rdate = document.getElementById("rdatea").value;
    let publn = document.getElementById("publs").value;
    let price2do = parseFloat(price);
    let plat = [];
    for (var option of document.getElementById('plattt').options) {
        if (option.selected) {
            plat.push(option.value);
    }}
    let typ = [];
    for (var option of document.getElementById('gtypee').options) {
        if (option.selected) {
            typ.push(option.value);
    }}
    // ||price==""||about==""||rdate==""||publn==""
    if (uploaded_image==""){
        Swal.fire({
            title: 'Error!',
            text: 'You must to choose game picture!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        isEmpty = true;
    }
   else if(gmname==""){
        Swal.fire({
            title: 'Error!',
            text: 'Game Name cant be empty!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        isEmpty = true;
    }
    
    else if (price==""){
        
        Swal.fire({
            title: 'Error!',
            text: 'Price cant be empty!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        isEmpty = true;
    }
    else if(isNaN(price)){
        Swal.fire({
            title: 'Error!',
            text: 'Price must be a number!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        isEmpty = true;
    }
    else if(price2do<0){
        Swal.fire({
            title: 'Error!',
            text: 'Price cant be negative!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        isEmpty = true;
    }
    else if (about==""){
        Swal.fire({
            title: 'Error!',
            text: 'About part cant be empty!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        isEmpty = true;
    }
    else if (rdate==""){
        Swal.fire({
            title: 'Error!',
            text: 'Relase date cant be empty!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        isEmpty = true;
    }
    else if (typ === undefined || typ.length == 0){
        Swal.fire({
            title: 'Error!',
            text: 'You must to choose at least 1 game type!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        isEmpty = true;
    }
    else if (publn==""){
        Swal.fire({
            title: 'Error!',
            text: 'Publisher name cant be empty!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        isEmpty = true;
    }
    else if (plat === undefined || plat.length == 0){
        Swal.fire({
            title: 'Error!',
            text: 'You must to choose at least 1 platform!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        isEmpty = true;
    }
   
    return isEmpty;
}
$(document).ready(function() {
    if(!isAuthenticated()) {
        window.location.href = "/403.html";
    }
})


function checkPlatforms() {
    if (!localStorage.getItem("platform")) {
      localStorage.setItem("platform",JSON.stringify([]))
    }
  }

  function checkGameType() {
    if (!localStorage.getItem("gametype")) {
      localStorage.setItem("gametype",JSON.stringify([]))
    }
  }