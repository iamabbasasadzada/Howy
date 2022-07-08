document.getElementById("addplatform").addEventListener("click", function(){
    if(!checkInputEmpplat()){
    checkPlatforms();
    let platforms = JSON.parse(localStorage.getItem("platform"));
    let pmname = document.getElementById("platn").value;
    let platf={
        id : platforms.length+1,
       pname:pmname
    }
    platforms.push(platf)
    localStorage.setItem("platform",JSON.stringify(platforms));
    document.getElementById("platn").value="";
    
    fillPlatformss();
}
})
fillPlatformss();
function fillPlatformss(){
    checkPlatforms();
    let table3 =document.getElementById("plat-table");
    table3.innerHTML=`<tr>
    <th>Plat Id</th>
    <th>Plat Name</th>
    <th>Action</th>
    </tr>`;
    let platfomssa=JSON.parse(localStorage.getItem("platform"));
    platfomssa.forEach(plat=>{
        var btnr =document.createElement('button');
        btnr.innerHTML = "Remove";
        btnr.classList.add("remobtn");
        btnr.id = "remobtnplat";
        var newRow = table3.insertRow(table3.rows.length),
        cell0= newRow.insertCell(0),
        cell1 = newRow.insertCell(1),
        cell2 = newRow.insertCell(2);
        cell0.innerHTML = plat.id;
    cell1.innerHTML =plat.pname;
    cell2.appendChild(btnr);

    btnr.onclick = function(){
        let platfomssa2=JSON.parse(localStorage.getItem("platform"));
        let rplatid="";
        let table3 =document.getElementById("plat-table");
        var currentindpl = btnr.closest('tr').rowIndex;
        let platid = table3.rows[currentindpl].cells[0].innerHTML;
        
        platfomssa2.forEach(plat=>{
            if(plat.id==platid){
                rplatid= platfomssa2.indexOf(plat);
                platfomssa2.splice(rplatid, 1); 
                
                return;
            }
        })
        localStorage.setItem("platform",JSON.stringify(platfomssa2));
        fillPlatformss();
    }

    })
}
function checkInputEmpplat(){
    let isEmpty = false;
    let pmname = document.getElementById("platn").value;
    if(pmname==""){
        Swal.fire({
            title: 'Error!',
            text: 'Platform name cant be empty!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        isEmpty = true;
    }
    return isEmpty;
}
function checkPlatforms() {
    if (!localStorage.getItem("platform")) {
      localStorage.setItem("platform",JSON.stringify([]))
    }
  }
