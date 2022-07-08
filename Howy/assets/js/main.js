console.log("%cWarning!", "color:yellow;font-size: 30px;");
console.log(
  "%c You are not smart. Close Console :)",
  "color:white;font-size: 30px;background: red;"
);

const themes = [
    {
      background: "#1A1A2E",
      color: "#FFFFFF",
      primaryColor: "#0F3460",
    },
    {
      background: "#461220",
      color: "#FFFFFF",
      primaryColor: "#E94560",
    },
    {
      background: "#192A51",
      color: "#FFFFFF",
      primaryColor: "#967AA1",
    },
    {
      background: "#F7B267",
      color: "#000000",
      primaryColor: "#F4845F",
    },
    {
      background: "#F25F5C",
      color: "#000000",
      primaryColor: "#642B36",
    },
    {
      background: "#231F20",
      color: "#FFF",
      primaryColor: "#BB4430",
    },
  ];

  const setTheme = (theme) => {
    const root = document.querySelector(":root");
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--color", theme.color);
    root.style.setProperty("--primary-color", theme.primaryColor);
    root.style.setProperty("--glass-color", theme.glassColor);
  };
  
  const displayThemeButtons = () => {
    const btnContainer = document.querySelector(".theme-btn-container");
    themes.forEach((theme) => {
      const div = document.createElement("div");
      div.className = "theme-btn";
      div.style.cssText = `background: ${theme.background}; width: 25px; height: 25px`;
      btnContainer.appendChild(div);
      div.addEventListener("click", () => setTheme(theme));
    });
  };
  
  displayThemeButtons();


  
// if(localStorage.getItem("IsAdmin")){
//     if(localStorage.IsAdmin="True"){
//         window.location.replace("/AdminMainPage.html");
//     }   
// }else{
//       localStorage.IsAdmin="False"
//   }


var usersCedentials = [
    {
        AdminLogin: "QWRtaW4=",
        Password: "MTIzNDU="
    }
];


function CheckUser() {
    let  AdminInput = $("#Username").val()
    let AdminPassword= $("#Pass").val()
    let Admin_input_encode = btoa(AdminInput);
    let Admin_Input_pass = btoa(AdminPassword);

    for (const credential of usersCedentials) {
        if((credential.AdminLogin == Admin_input_encode) && (credential.Password == Admin_Input_pass)){
            console.log("Girildi")
            localStorage.IsAdmin="True"
            window.location.href = "/AdminMainPage.html";
        }
    }
    
}
$(function( ){
    
    $("#loginForm").on("submit", function(e) {
        e.preventDefault();
        CheckUser();
    })
    if(isAuthenticated()) {
        window.location.href = "/AdminMainPage.html";
    }
})

if (!localStorage.getItem("IsAdmin")) {
  localStorage.IsAdmin="False"
}

// $("#MyBtn").click(function(){
//     CheckUser();

// });



// // Decode the String
// var decodedString = atob(encodedString);
// console.log(decodedString); // Outputs: "Hello World!"