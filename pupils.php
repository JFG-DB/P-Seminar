<!DOCTYPE html>


<html>

    <head>
        <title>Schule</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="CSS/pupilsStyle.css">
        <script type="text/javascript" src="JS/pupilScript.js"></script>
        <!--<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>-->
        <script type="text/javascript" src="JS/chart.js"></script>
        <script type="application/json" src="JS/data.json"></script>
        <!--<script></script>-->
    </head>

    <body onload="startPupils()">

        <dialog open id="dialog">
            <h2>Anmeldung</h2>
            <form method="post" action="javascript:showTeam()">
               <label for="tnr">Bitte geben Sie Ihre Teamnummer an: </label>
               <select name="tnr" id="tnr">
                   <option value="1">Team 1</option>
                   <option value="2">Team 2</option>
                   <option value="3">Team 3</option>
                   <option value="4">Team 4</option>
                   <option value="5">Team 5</option>
                   <option value="6">Team 6</option>
                   <option value="7">Team 7</option>
                   <option value="8">Team 8</option>
               </select>
             </form>  
            <button id="Anmeldung">Anmelden</button>
        </dialog>

        <div class="teamContainer" id="tc1">
            <div class="flexbox-container">
                <div class="flexbox" id="flxOne"><h1>Team 1</h1></div>
                <div class="flexbox" id="flxTwo">
                    <!--<form method="post" action="javascript:showAttempt()" style="display: inline;">-->
                    <form method="post" action="javascript:showAttempt()" style="display: inline;">
                        <label for="versuch">Bitte wählen Sie Ihren Versuch aus: </label>
                        <select name="versuch" id="versuch">
                            <!--<option value="leistung">Leistung</option>-->
                            <option value="ultraschall">Schiefe Ebene</option>
                            <!--<option value="spannung">Spannung</option>-->
                            <option value="temperatur">Temperatur</option>
                        </select>
                        <input id="versuchSubmit" type="submit" value="Auswählen">
                    </form>
                </div>
                <div class="flexbox" id="flxTre"><img src="Icons/zahnrad.png" id="zahnrad"></div>
            </div>

            <div class="versuchsContainer" id="vc1">
                <div class="newExercise" id="ne1">
                    <form method="post" action="">
                        <input type="submit" name="submit" value="Neuer Versuch" id="startButton"/>
                    </form>
                        
                        <?php
                        //if ($_SERVER["REQUEST_METHOD"] == "POST")
                        //{
                        //    $handle = fopen("/var/www/P-Seminar-clone/test/test.txt", "w") or die ("Unable to open file");
                        //    $txt = "yes";
                        //    fwrite($handle, $txt);
                        //    fclose($handle);
                        //}
                        ?>                   
                </div>
                <div class="loading"></div>
                <div class="tableContainer" id="tbc1">
                    <?php
                        if ($_SERVER["REQUEST_METHOD"] == "POST")
                        {
                            $servername = "localhost";
                            $username = "raspberrypi";
                            $password = "piraspberry";
                            $dbname = "test";
                    
                            $conn = new mysqli($servername, $username, $password, $dbname);

                            if ($conn->connect_error) {
                                die("Connection failed: " . $conn->connect_error);
                              }
                              //echo "Connected successfully";

                            if ($_GET["attempt"] == "ultraschall")
                            {                           
                                $sql = "SELECT value FROM valuet WHERE team=1 AND test=1 ORDER BY time LIMIT 20";
                                $result = $conn->query($sql);     
                                //echo $result;
                                //echo "Hello";
                                
                                if($result->num_rows > 0)
                                {
                                    echo "<table>"; 
                                    echo "<tr>";
                                    echo "<td>&#916;t in s</td>";
                                    for( $i = 0; $i < $result->num_rows; $i++)
                                    {
                                        $j = ($i+1)*2/10;
                                        if((($i+1) % 5) == 0)
                                        {
                                            echo "<td>".$j.".0</td>";
                                        }else{
                                            echo "<td>".$j."</td>";
                                        }
                                        
                                    }
                                    echo "</tr><tr>"; 
                                    echo "<td>s in cm</td>";                              
                                    while($row = $result->fetch_assoc())
                                    {
                                        echo "<td>".$row["value"]."</td>";
                                    }
                                    echo "</tr>";
                                    echo "</table>";
                                }
                            }else if($_GET["attempt"] == "temperature")
                            {
                                $sql = "SELECT value FROM valuet WHERE team=1 AND test=2 ORDER BY time LIMIT 20";
                                $result = $conn->query($sql);
                                //echo $result;
                                //echo "World";
                                
                                if($result->num_rows > 0)
                                {
                                    echo "<table>"; 
                                    echo "<tr>";
                                    echo "<td>t in s</td>";
                                    for( $i = 0; $i < $result->num_rows; $i++)
                                    {
                                        $j = $i*10;
                                        echo "<td>$j</td>";
                                    }
                                    echo "</tr<tr>"; 
                                    echo "<td>&#920; in °C</td>";                              
                                    while($row = $result->fetch_assoc())
                                    {
                                        echo "<td>".$row["value"]."</td>";
                                    }
                                    echo "</tr>";
                                    echo "</table>";
                                }
                            }                            
                            $conn->close();
                        }
                        ?>
                    <!--<script>setTimeout(drawTable, 10000); setTimeout(function () {document.getElementsByClassName("loading")[0].style.display = "none";}, 10000)</script>-->
                    <!--<a href="data.csv" download>Hier klicken zum Download von der CSV Datei</a>-->
                </div>
                <div class="chartContainer" id="cc1" >
                    <canvas id="myChart" width="400" height="400"></canvas>
                    <script>//drawTable(); //document.getElementById("cc1").style.maxHeight = "640px";</script>
                </div>
            </div>
        </div>

        <div class="teamContainer" id="tc2">
            <div class="flexbox-container">
                <div class="flexbox" id="flxOne"><h1>Team 2</h1></div>
                <div class="flexbox" id="flxTwo">
                    <form method="post" action="javascript:" style="display: inline;">
                        <label for="versuch">Bitte wählen Sie Ihren Versuch aus: </label>
                        <select name="versuch" id="versuch">
                            <option value="">Leistung</option>
                            <option value="">Bewegung</option>
                            <option value="">Spannung</option>
                            <option value="">Temperatur</option>
                        </select>
                    </form>
                    <form>
                        <!--Hier sollten dann per JS die Eingabemöglichkeiten der Versuche erscheinen-->
                    </form>
            </div>
                <div class="flexbox" id="flxTre"></div>
            </div>
    
            <div class="versuchsContainer" id="vc2">
                <div class="tableContainer" id="tbc2"></div>
                <div class="chartContainer" id="cc2" >
                    <canvas id="myChart" width="400" height="400"></canvas>
                    <!--<script>var ctx = document.getElementById('myChart').getContext('2d');drawChart();</script>-->
                </div>
            </div>
        </div>

        <div class="teamContainer" id="tc3">
            <div class="flexbox-container">
                <div class="flexbox" id="flxOne"><h1>Team 3</h1></div>
                <div class="flexbox" id="flxTwo">
                    <form method="post" action="javascript:" style="display: inline;">
                        <label for="versuch">Bitte wählen Sie Ihren Versuch aus: </label>
                        <select name="versuch" id="versuch">
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                    </form>
                    <form>
                        <!--Hier sollten dann per JS die Eingabemöglichkeiten der Versuche erscheinen-->
                    </form>
            </div>
                <div class="flexbox" id="flxTre"></div>
            </div>
    
            <div class="versuchsContainer" id="vc3">
                <div class="tableContainer" id="tbc3"></div>
                <div class="chartContainer" id="cc3" >
                    <canvas id="myChart" width="400" height="400"></canvas>
                    <!--<script>var ctx = document.getElementById('myChart').getContext('2d');drawChart();</script>-->
                </div>
            </div>
        </div>

        <div class="teamContainer" id="tc4">
            <div class="flexbox-container">
                <div class="flexbox" id="flxOne"><h1>Team 4</h1></div>
                <div class="flexbox" id="flxTwo">
                    <form method="post" action="javascript:" style="display: inline;">
                        <label for="versuch">Bitte wählen Sie Ihren Versuch aus: </label>
                        <select name="versuch" id="versuch">
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                    </form>
                    <form>
                        <!--Hier sollten dann per JS die Eingabemöglichkeiten der Versuche erscheinen-->
                    </form>
            </div>
                <div class="flexbox" id="flxTre"></div>
            </div>
    
            <div class="versuchsContainer" id="vc4">
                <div class="tableContainer" id="tbc4"></div>
                <div class="chartContainer" id="cc4" >
                    <canvas id="myChart" width="400" height="400"></canvas>
                    <!--<script>var ctx = document.getElementById('myChart').getContext('2d');drawChart();</script>-->
                </div>
            </div>
        </div>

        <div class="teamContainer" id="tc5">
            <div class="flexbox-container">
                <div class="flexbox" id="flxOne"><h1>Team 5</h1></div>
                <div class="flexbox" id="flxTwo">
                    <form method="post" action="javascript:" style="display: inline;">
                        <label for="versuch">Bitte wählen Sie Ihren Versuch aus: </label>
                        <select name="versuch" id="versuch">
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                    </form>
                    <form>
                        <!--Hier sollten dann per JS die Eingabemöglichkeiten der Versuche erscheinen-->
                    </form>
            </div>
                <div class="flexbox" id="flxTre"></div>
            </div>
    
            <div class="versuchsContainer" id="vc5">
                <div class="tableContainer" id="tbc5"></div>
                <div class="chartContainer" id="cc5" >
                    <canvas id="myChart" width="400" height="400"></canvas>
                    <!--<script>var ctx = document.getElementById('myChart').getContext('2d');drawChart();</script>-->
                </div>
            </div>
        </div>

        <div class="teamContainer" id="tc6">
            <div class="flexbox-container">
                <div class="flexbox" id="flxOne"><h1>Team 6</h1></div>
                <div class="flexbox" id="flxTwo">
                    <form method="post" action="javascript:" style="display: inline;">
                        <label for="versuch">Bitte wählen Sie Ihren Versuch aus: </label>
                        <select name="versuch" id="versuch">
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                    </form>
                    <form>
                        <!--Hier sollten dann per JS die Eingabemöglichkeiten der Versuche erscheinen-->
                    </form>
            </div>
                <div class="flexbox" id="flxTre"></div>
            </div>
    
            <div class="versuchsContainer" id="vc6">
                <div class="tableContainer" id="tbc6"></div>
                <div class="chartContainer" id="cc6" >
                    <canvas id="myChart" width="400" height="400"></canvas>
                    <!--<script>var ctx = document.getElementById('myChart').getContext('2d');drawChart();</script>-->
                </div>
            </div>
        </div>
        
        <div class="teamContainer" id="tc7">
            <div class="flexbox-container">
                <div class="flexbox" id="flxOne"><h1>Team 7</h1></div>
                <div class="flexbox" id="flxTwo">
                    <form method="post" action="javascript:" style="display: inline;">
                        <label for="versuch">Bitte wählen Sie Ihren Versuch aus: </label>
                        <select name="versuch" id="versuch">
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                    </form>
                    <form>
                        <!--Hier sollten dann per JS die Eingabemöglichkeiten der Versuche erscheinen-->
                    </form>
            </div>
                <div class="flexbox" id="flxTre"></div>
            </div>
    
            <div class="versuchsContainer" id="vc7">
                <div class="tableContainer" id="tbc7"></div>
                <div class="chartContainer" id="cc7" >
                    <canvas id="myChart" width="400" height="400"></canvas>
                    <!--<script>var ctx = document.getElementById('myChart').getContext('2d');drawChart();</script>-->
                </div>
            </div>
        </div>
        
        <div class="teamContainer" id="tc8">
            <div class="flexbox-container">
                <div class="flexbox" id="flxOne"><h1>Team 8</h1></div>
                <div class="flexbox" id="flxTwo">
                    <form method="post" action="javascript:" style="display: inline;">
                        <label for="versuch">Bitte wählen Sie Ihren Versuch aus: </label>
                        <select name="versuch" id="versuch">
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                    </form>
                    <form>
                        <!--Hier sollten dann per JS die Eingabemöglichkeiten der Versuche erscheinen-->
                    </form>
            </div>
                <div class="flexbox" id="flxTre"></div>
            </div>
    
            <div class="versuchsContainer" id="vc8">
                <div class="tableContainer" id="tbc8"></div>
                <div class="chartContainer" id="cc8" >
                    <canvas id="myChart" width="400" height="400"></canvas>
                    <!--<script>var ctx = document.getElementById('myChart').getContext('2d');drawChart();</script>-->
                </div>
            </div>
        </div>

    </body>
</html>