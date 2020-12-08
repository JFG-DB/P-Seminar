function start()
{
    dialog = document.getElementById('dialog');
    Anmeldung = document.getElementById("Anmeldung");
    Abbruch = document.getElementById("Abbruch");
    Anmeldung.addEventListener('click',showTeam);
    Abbruch.addEventListener('click',schliesseFenster);

    if(sessionStorage.getItem('team') != null){
        show("div".concat(sessionStorage.getItem('team')));
        schliesseFenster();
    }
}

function show(id){

    document.getElementById(id).style.display = "inline";

}

function showTeam()
{

    var nr = document.getElementById("tnr").value;
    document.getElementById("div".concat(nr)).style.display = "inline";
    dialog.close();
    sessionStorage.setItem('team', nr);

}

function schliesseFenster(){
    dialog.close();
}

function beamerShow(){
    
    var a = document.createElement("iframe");
    var b = document.createElement("iframe");
    var c = document.createElement("iframe");
    var d = document.createElement("iframe");
    var e = document.createElement("iframe");
    var f = document.createElement("iframe");
    var g = document.createElement("iframe");
    var h = document.createElement("iframe");

    a.src = "pupils.html";
    b.src = "pupils.html";
    c.src = "pupils.html";
    d.src = "pupils.html";
    e.src = "pupils.html";
    f.src = "pupils.html";
    g.src = "pupils.html";
    h.src = "pupils.html";

    this.appendChild(a,b,c,d,e,f,g,h);
}