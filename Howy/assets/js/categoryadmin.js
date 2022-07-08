document.getElementById("addcategory").addEventListener("click", function(){
    if(!checkInputEmp()){
    checkGameType() ;
    let gtype = JSON.parse(localStorage.getItem("gametype"));
    let tnname = document.getElementById("cate").value;
    let catef={
        id : gtype.length+1,
       tname:tnname
    }
    gtype.push(catef)
    localStorage.setItem("gametype",JSON.stringify(gtype));
    document.getElementById("cate").value="";
    
    fillGametypes();
}
})
fillGametypes();
function fillGametypes(){
    checkGameType() ;
    let table3 =document.getElementById("cate-table");
    table3.innerHTML=`<tr>
    <th>Type Id</th>
    <th>Type Name</th>
    <th>Action</th>
    </tr>`;
    let gtype = JSON.parse(localStorage.getItem("gametype"));
    gtype.forEach(gtypew=>{
        var btnr =document.createElement('button');
        btnr.innerHTML = "Remove";
        btnr.classList.add("remobtn");
        btnr.id = "remobtngtype";
        var newRow = table3.insertRow(table3.rows.length),
        cell0= newRow.insertCell(0),
        cell1 = newRow.insertCell(1),
        cell2 = newRow.insertCell(2);
        cell0.innerHTML = gtypew.id;
    cell1.innerHTML =gtypew.tname;
    cell2.appendChild(btnr);

    btnr.onclick = function(){
        let gtype2 = JSON.parse(localStorage.getItem("gametype"));
        let rtypid="";
        let table3 =document.getElementById("cate-table");
        var currentindpl = btnr.closest('tr').rowIndex;
        let gtypeid = table3.rows[currentindpl].cells[0].innerHTML;
        
        gtype2.forEach(gtyp=>{
            if(gtyp.id==gtypeid){
                rtypid= gtype2.indexOf(gtyp);
                gtype2.splice(rtypid, 1); 
                
                return;
            }
        })
        localStorage.setItem("gametype",JSON.stringify(gtype2));
        fillGametypes();
    }

    })
}
function checkInputEmp(){
    let isEmpty = false;
    let tnname = document.getElementById("cate").value;
    if(tnname==""){
        Swal.fire({
            title: 'Error!',
            text: 'Game type name cant be empty!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        isEmpty = true;
    }
    return isEmpty;
}
function checkGameType() {
    if (!localStorage.getItem("gametype")) {
      localStorage.setItem("gametype",JSON.stringify([]))
    }
  }
  $(document).ready(function() {
    if(!isAuthenticated()) {
        window.location.href = "/403.html";
    }
})
