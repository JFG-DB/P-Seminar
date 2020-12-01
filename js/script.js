function swTeam(x){


    for(i = 0; i < 8; i++){
        
        document.getElementsByClassName("navlink")[i].style.backgroundColor = "rgb(0,110,255)";

    }

    document.getElementById("t" + x).style.backgroundColor = "rgb(83,83,83)";

}