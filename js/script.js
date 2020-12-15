function startPupils()
{
    dialog = document.getElementById('dialog');
    Anmeldung = document.getElementById("Anmeldung");
    Anmeldung.addEventListener('click',showTeam);
    params = getParams();

    if(params != null)
    {
        document.getElementById("tnr").value = parseInt(Object.values(params)[0], 10);
        this.showTeam();

    }
    
    if(sessionStorage.getItem('team') != null)
    {
        show("div".concat(sessionStorage.getItem('team')));
        schliesseFenster();
    }
}

function show(id)
{

    document.getElementById(id).style.display = "inline";

}

function showTeam()
{
    var nr = document.getElementById("tnr").value;
    document.getElementById("div".concat(nr)).style.display = "inline";
    dialog.close();
    sessionStorage.setItem('team', nr);
}

function schliesseFenster()
{
    dialog.close();
}

function getParams() 
{

    var params = {},
        pairs = document.URL.split('?')
               .pop()
               .split('&');

    for (var i = 0, p; i < pairs.length; i++) {
           p = pairs[i].split('=');
           params[ p[0] ] =  p[1];
    }     

    return params;
}

function setIframeList(){
    for(var i = 0; i < 8; i++){
        document.getElementsByTagName("IFRAME")[i].style.width = "100%";
    }
}
function setIframeGrid(){
    for(var i = 0; i < 8; i++){
        document.getElementsByTagName("IFRAME")[i].style.width = "100%";
    }
}