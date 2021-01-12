function startPupils()
{
    dialog = document.getElementById('dialog');
    Anmeldung = document.getElementById("Anmeldung");
    Anmeldung.addEventListener('click', team);
    params0 = getParams();

    document.getElementById("tnr").value = parseInt(Object.values(params0)[0], 10);
    this.showTeam();
}

function showTeam()
{
    var nr = document.getElementById("tnr").value;
    document.getElementById('tc'.concat(nr)).style.display = "inline";
    dialog.close();
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

function team()
{
    open(document.URL + "?tnr=" + document.getElementById('tnr').value, "_parent");
    dialog.close();
}

function drawChart()
{
    var chart = new CanvasJS.Chart("cc1", {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Simple Line Chart"
        },
        data: [{        
            type: "line",
              indexLabelFontSize: 16,
            dataPoints: [
            { y: 450 },
			{ y: 414},
			{ y: 520, indexLabel: "\u2191 highest",markerColor: "red", markerType: "triangle" },
			{ y: 460 },
			{ y: 450 },
			{ y: 500 },
			{ y: 480 },
			{ y: 480 },
			{ y: 410 , indexLabel: "\u2193 lowest",markerColor: "DarkSlateGrey", markerType: "cross" },
			{ y: 500 },
			{ y: 480 },
			{ y: 510 }
            ]
        }]
    });
    chart.render();
}

function showAttempt()
{
    
}