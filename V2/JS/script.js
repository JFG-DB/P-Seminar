function startPupils()
{
    dialog = document.getElementById('dialog');
    Anmeldung = document.getElementById("Anmeldung");
    Anmeldung.addEventListener('click', team);
    params0 = getParams();

    document.getElementById("tnr").value = parseInt(Object.values(params0)[0], 10);
    this.showTeam();
    
    if(Object.values(params0)[1] == undefined)
    {
        addURLparam("&flxcon=flex");
        console.log("Hello");
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
    }
    document.getElementById('versuch').value = m;
}

function drawChart()
{
    var myLineChart = new Chart(ctx, {
        type: 'line',
    data: {
        datasets: [{
            label: '# of Votes',
            data: [{x: 2,y: 3},{x: 3,y: 5},{x: 12,y: 19}],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize: 1,
                    maxTicksLimit: 20
                },
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 20
                }
            }]
        }
    }
});
}
