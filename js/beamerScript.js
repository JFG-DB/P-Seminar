function startBeamer()
{
    load();
    params0 = getParams();
    ope = true;
    clos = document.getElementById("close");
    settings = document.getElementById("flexbox-container0");
    clos.addEventListener("click", function () { if(ope){settings.style.display="none"; ope = false; clos.innerHTML = "<<"}else{settings.style.display="flex"; ope = true; clos.innerHTML = ">>";}})
    if(Object.values(params0)[0]){document.getElementById('versuch').value = String(Object.values(params0)[0]);}
    showAttempt();
}

function getParams()
{
    var params = {},
        pairs = document.URL.split('?').pop().split('&');
    for (var i = 0, p; i < pairs.length; i++) 
    {
           p = pairs[i].split('=');
           params[ p[0] ] =  p[1];
    }     
    return params;
}

function addURLparam(param)
{
    open(document.URL + param, "_parent");
}

function showAttempt()
{
    m = document.getElementById('versuch').value;
    if(Object.values(params0)[0] == undefined){
        addURLparam("?attempt=" + m);
    }else if(String(Object.values(params0)[0]) != m){
        switch(String(Object.values(params0)[0])) {
            case "leistung":
                open(document.URL.replace(/leistung/g, m), "_parent");
                break;
            case "bewegung":
                open(document.URL.replace(/bewegung/g, m), "_parent");
                break;
            case "spannung":
                open(document.URL.replace(/spannung/g, m), "_parent");
                break;
            case "temperatur":
                open(document.URL.replace(/temperatur/g, m), "_parent");
                break;
        }
    }
    document.getElementById('versuch').value = m;
    updateIframes();
}

function updateIframes()
{
    for(i in Object.values(params0))
    {
        for(i = 1; i < 9; i++)
        {
            document.getElementById("t" + i).src = document.getElementById("t" + i).src + "&attempt=" + String(Object.values(params0)[0]);
        }
    }
}