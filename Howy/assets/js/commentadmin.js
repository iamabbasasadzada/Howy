fillComments();
function fillComments(){
    checkcommentsLocal() ;
    let table3 =document.getElementById("comm-table");
    table3.innerHTML=`<tr>
    <th>Comment Id</th>
    <th>Name</th>
    <th>Surname</th>
    <th>Comment details</th>
    <th>GameId</th>
    <th>Action</th>
    </tr>`;
    let comments = JSON.parse(localStorage.getItem("comments"));
    comments.forEach(comment=>{
        var btnr =document.createElement('button');
        btnr.innerHTML = "Remove";
        btnr.classList.add("remobtn");
        btnr.id = "remobtncomment";
        var newRow = table3.insertRow(table3.rows.length),
        cell0= newRow.insertCell(0),
        cell1 = newRow.insertCell(1),
        cell2 = newRow.insertCell(2),
        cell3= newRow.insertCell(3),
        cell4 = newRow.insertCell(4),
        cell5 = newRow.insertCell(5);
        cell0.innerHTML = comment.id;
    cell1.innerHTML =comment.cname;
    cell2.innerHTML =comment.clname;
    cell3.innerHTML =comment.ccom;
    cell4.innerHTML =comment.gameid;
    cell5.appendChild(btnr);

    btnr.onclick = function(){
        let comments2 = JSON.parse(localStorage.getItem("comments"));
        let rcomid="";
        let table3 =document.getElementById("comm-table");
        var currentindpl = btnr.closest('tr').rowIndex;
        let commif = table3.rows[currentindpl].cells[0].innerHTML;
        
        comments2.forEach(comm1=>{
            if(comm1.id==commif){
                rcomid= comments2.indexOf(comm1);
                comments2.splice(rcomid, 1); 
                
                return;
            }
        })
        localStorage.setItem("comments",JSON.stringify(comments2));
        fillComments();
    }

    })
}

function checkcommentsLocal() {
    if (!localStorage.getItem("comments")) {
      localStorage.setItem("comments",JSON.stringify([]))
    }
  }
  $(document).ready(function() {
    if(!isAuthenticated()) {
        window.location.href = "/403.html";
    }
})
