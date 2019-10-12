
function validateInput(){
   console.log("painettu")
    let input = document.getElementsByClassName("inputField");

    for (let i = 0; i < array.length; i++) {
        input[i].oninvalid = function(event){
            let div = document.getElementById("inputDiv_"+i);
            div.style = "background-color : blue;"
        }
        
    }
}
