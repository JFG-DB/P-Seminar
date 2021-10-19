function startPupils()
{
    dialog = document.getElementById('dialog');
    Anmeldung = document.getElementById("Anmeldung");
    Anmeldung.addEventListener('click', team);
    params0 = getParams();
    config = null;
    myLineChart = null;

    document.getElementById("tnr").value = parseInt(Object.values(params0)[0], 10);
    this.showTeam();
    
    if(Object.values(params0)[1] == undefined)
    {
        addURLparam("&flxcon=flex");
        //console.log("Hello");
    }else{
        for(i = 0; i < 8; i++)
        {
            document.getElementsByClassName("flexbox-container")[i].style.display = String(Object.values(params0)[1]);
        }
    }
    document.getElementById('versuch').value = String(Object.values(params0)[2]);
    
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

function showTeam()
{
    var nr = document.getElementById("tnr").value;
    document.getElementById('tc'.concat(nr)).style.display = "inline";
    dialog.close();
}

function team()
{
    addURLparam("?tnr=" + document.getElementById('tnr').value);
    dialog.close();
}

function showAttempt()
{
    m = document.getElementById('versuch').value;
    if(Object.values(params0)[2] == undefined){
        addURLparam("&attempt=" + m);
    }else if(String(Object.values(params0)[2]) != m){
        switch(String(Object.values(params0)[2])) {
            case "leistung":
                open(document.URL.replace(/leistung/g, m), "_parent");
                break;
            case "ultraschall":
                open(document.URL.replace(/ultraschall/g, m), "_parent");
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
}

function drawTable()
{
    var b = true;
    var i = 0;
    var x; 
    var y; 
    var z;
    var myObj;
    var ctx;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            ctx = document.getElementById('myChart').getContext('2d');
            x = document.createElement("table");
            y = document.createElement("tr");
            yy = document.createElement("tr");
            z = document.createElement("td");
            zz = document.createElement("td");
            if(String(Object.values(params0)[2]) == "ultraschall"){
                z.innerHTML = "&#916;";
                z.appendChild(document.createTextNode("s in cm"));
                zz.appendChild(document.createTextNode("t in s"));
            }else if(String(Object.values(params0)[2]) == "temperatur"){
                z.innerHTML = "&#920;";
                z.appendChild(document.createTextNode(" in °C"));
                zz.appendChild(document.createTextNode("t in s"));
            }           
            y.append(z);
            yy.append(zz);
            x.appendChild(yy);
            x.appendChild(y);
            
            while (b) {
                //console.log(myObj[String(Object.values(params0)[2])]);                
                if(/*i < 10)*/myObj[String(Object.values(params0)[2])]/*[i]*/["Wert" + i.toString()] != undefined && myObj[String(Object.values(params0)[2])]/*[i]*/["Wert" + i.toString()] != 'null' && myObj[String(Object.values(params0)[2])][i] != 'null' )
                {
                    z = document.createElement("td");
                    zz = document.createElement("td");
                    if(String(Object.values(params0)[2]) == "ultraschall"){
                        time = (i+1)*2/10;
                        z.appendChild(document.createTextNode(myObj[String(Object.values(params0)[2])]/*[i]*/["Wert" + i.toString()]));
                        if(time % 1 == 0){
                            zz.appendChild(document.createTextNode(time + ".0"));
                        }else{
                            zz.appendChild(document.createTextNode(time));
                        }
                    }else if(String(Object.values(params0)[2]) == "temperatur"){
                        time = i*10;
                        z.appendChild(document.createTextNode(myObj[String(Object.values(params0)[2])]/*[i]*/["Wert" + i.toString()]));
                        zz.appendChild(document.createTextNode(time));
                    }                    
                    y.append(z);
                    yy.append(zz);
                    x.appendChild(yy);
                    x.appendChild(y);
                    i++;
                }else{
                    b = false;
                }
            }
            
            document.getElementById('tbc1').appendChild(x);
        }
    };
    xmlhttp.open("GET", "JS/data.json", true);
    xmlhttp.send();
}

function drawChart()
{
    var myObj;
    var labels = {};
    var datas = {};
    var data;
    var ctx;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            ctx = document.getElementById('myChart').getContext('2d');
            for (i = 0; i < 10; i++) {
                //console.log(myObj[String(Object.values(params0)[2])]);
                //console.log(myObj[String(Object.values(params0)[2])]["Wert" + i.toString()]);
                if(myObj[String(Object.values(params0)[2])]["Wert"+i] != 'null')
                {
                    labels[i] = "Wert " + i;
                    //console.log(myObj[String(Object.values(params0)[2])]);
                    //console.log(myObj[String(Object.values(params0)[2])]["Wert" + i.toString()]);
                    datas[i] = parseInt(myObj[String(Object.values(params0)[2])]["Wert" + i.toString()]);
                }
            }
            /*for (i = 0; i < 10; i++){
                console.log(labels[i] + " " + datas[i]);
            }*/
            data = {
                //labels: labels,
                datasets: [{
                    label: 'Messung',
                    data: datas,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            };
            const config = {
                type: 'line',
                data: data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        },
                        x: {
                            beginAtZero: true
                        }
                    }
                }
            };
            myLineChart = new Chart(ctx, config);
            updateChart(myLineChart);
        }
        
    };   
    xmlhttp.open("GET", "JS/data.json", true);
    xmlhttp.send();   
}

function updateChart()
{      
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = ganzEinfach;   
    xmlhttp.open("GET", "JS/data.json", true);
    xmlhttp.send();
}

function ganzEinfach() 
{
    var myObj;
    var labels = {};
    var datas = {};
    if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
        for (i = 0; i < 10; i++) {
            if(myObj[String(Object.values(params0)[2])]["Wert"+i] != 'null')
            {
                labels[i] = "Wert " + i;
                datas[i] = parseInt(myObj[String(Object.values(params0)[2])]["Wert" + i.toString()]);
            }
        }
        for (i = 0; i < 10; i++){
            //console.log(labels[i] + " " + datas[i]);
        }
        myLineChart.data.datasets[0].data = datas;
        myLineChart.update();
        //myLineChart.render();
        setInterval(updateChart, 20000);
    }
    
}