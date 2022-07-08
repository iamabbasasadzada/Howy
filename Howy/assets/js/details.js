fillpage();
fillcomment();
let menu = document.querySelector(".menu-icon");
let navbar = document.querySelector(".menu");
let icn = document.querySelector(".menu-icon");

icn.addEventListener("click", function () {
    navbar.classList.toggle("active");
});
menu.addEventListener("click", function () {
    menu.classList.toggle("move")
});
// let table3 =document.getElementById("cate-table");
//     table3.innerHTML=`<tr>
//     <th>Type Id</th>
//     <th>Type Name</th>
//     <th>Action</th>
//     </tr>`;
document.getElementById("cart-icon").addEventListener("click", function () {
  document.getElementById("modalofcart").classList.add("activemodal");
})
document.getElementById("btn-close").addEventListener("click", function () {
  document.getElementById("modalofcart").classList.remove("activemodal");
})
function fillpage(){
    let game = JSON.parse(localStorage.getItem("games")).find(x=>x.id == window.location.search.replace("?id=",""));
    var buttonaddtocart = document.createElement("button");
          buttonaddtocart.classList.add("custom-btn");
          buttonaddtocart.classList.add("btn-3");
          buttonaddtocart.classList.add("buybtn");
          buttonaddtocart.innerHTML+=`<span>Add To Cart</span>`;
    document.querySelector(".gamedetails").innerHTML+=`
    <div class="images">
        <div class="image">
          <img
            src="${game.imgsrc}"
            alt=""
            class="imgfor"
          />
        </div>
        <div></div>
      </div>
      <div class="details">
        <h1 id="gamename">${game.gname}</h1>
        <br />
        <hr class="hrstyle-two"/ >
        <br />
        <p class="priceword">Price:</p>
        <p id="priceofgame">$${game.price}</p>
        <p></p>
        <br />
        <hr class="hrstyle-two"/ >
        <br />
        <p id="aboutgame">
        ${game.aboutg}
        </p>
        <br />
        <hr class="hrstyle-two"/ >
        <p id="publish">Publisher:</p>
        <p id="publis">${game.publ}</p>
        <br />
        <p id="relaseh">Relase Date:</p>
        <p id="relase">${game.rdate}</p>
        <br />
        <p id="typesofgameh">Game Types:</p>
        <p id="typesofgame">${game.gtype}</p>
        <br />
        <p id="platp">Platform:</p>
        <p id="plattt">${game.plat}</p>
        <br />
        <hr class="hrstyle-two"/ >
        <div class="buttons">
          
          <button class="custom-btn btn-3 buynow"><span>Buy Now</span></button>
        </div>
      </div>
    `
    buttonaddtocart.onclick = function(){
      checkCart();
      let game2 = JSON.parse(localStorage.getItem("games")).find(x=>x.id == window.location.search.replace("?id=",""));
      let cart2 = JSON.parse(localStorage.getItem("cart"));
      let cartitem={
        id : cart2.length+1,
        iname : game2.gname,
        iprice : game2.price,
        iimgsrc:game2.imgsrc
      };
      cart2.push(cartitem)
      localStorage.setItem("cart",JSON.stringify(cart2));
      fillTheCart();
    };

    document.querySelector(".buttons").appendChild(buttonaddtocart);
{/* <button class="custom-btn btn-3 buybtn">
            <span>Add To Cart</span>
          </button> */}
          
}
fillTheCart()
function checkEmptyInput()
{
    let isEmpty = false;
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let comm = document.getElementById("comm").value;

    if(fname === ""){
        Swal.fire({
            title: 'Error!',
            text: 'First Name cant be empty!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        isEmpty = true;
    }
    else if(lname === ""){
       Swal.fire({
            title: 'Error!',
            text: 'Last Name cant be empty!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        isEmpty = true;
    }
    else if(comm === ""){
        Swal.fire({
            title: 'Error!',
            text: 'Comment cant be empty!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        isEmpty = true;
    }
    return isEmpty;
}

document.getElementById("commentbtn").addEventListener("click", function(){
  checkcommentis();
    if(! checkEmptyInput()){
        let fname = document.getElementById("fname").value;
        let lname = document.getElementById("lname").value;
        let comm = document.getElementById("comm").value;
        let comments = JSON.parse(localStorage.getItem("comments"));
        let comment = {
            id : comments.length+1,
            cname : fname,
            clname : lname,
            ccom:comm,
            gameid : window.location.search.replace("?id=","")
        }
        comments.push(comment);
        localStorage.setItem("comments",JSON.stringify(comments));
        document.getElementById("comments").innerHTML =` <h1 class="commentheadd">Comments</h1>`;
        fillcomment()
        document.getElementById("fname").value="";
        document.getElementById("lname").value="";
        document.getElementById("comm").value="";
    }
})

function fillcomment(){
  checkcommentis();
    let comments = JSON.parse(localStorage.getItem("comments"));
    comments.forEach(comm => {
        if(comm.gameid == window.location.search.replace("?id=","")){
            document.getElementById("comments").innerHTML +=`
            <div class="commentofpeople">
                <i class="las la-dragon fonticon"></i><span>${comm.cname}  ${comm.clname}</span>
                <p id="pofcomment">${comm.ccom}</p>
            </div>
            `
        }
    });
}

function checkcommentis(){
  if (!localStorage.getItem("comments")) {
    localStorage.setItem("comments",JSON.stringify([]))
  }
}

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
    cell1.innerHTML = `<img width='100px' src="${carti.iimgsrc}"/>`;
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