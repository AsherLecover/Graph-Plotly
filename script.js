
var csvData = new Array();
var rpmData = [{ x: [], y: [],mode: 'lines' }];
var rpmDataPoints = [{ x: [], y: [], mode: "markers", marker: {color:'red', size: 12}}];
var movementFastData = [{x: [],y:[]}];
var distanceData = [{x: [],y:[]}];
var heatmapData = [{x: [], y:[], z:[-3.021, -2.5021, -2.021, -1.5021, -1.021, -0.5021, 0.021, 0.5021, 1.021, 1.5021, 2.021, 2.5021, 3.021], type: 'heatmap', hoverongaps: false}];

var phaseData = new Array();
var treatmentData = new Array();

function get(url, callback) {
  var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        if ('function' === typeof callback) {
          callback(request.responseText);
        }
      }
    };

    request.open('GET', url, false)
    request.send(null);
  }

  get('https://raw.githubusercontent.com/AsherLecover/Graph-Data/master/phase-example.csv', function(jsonObjectPhase) {

    jsonObjectPhase = jsonObjectPhase.split(/\r?\n|\r/);
          for (var i = 0; i < jsonObjectPhase.length; i++) {
            
              phaseData.push(jsonObjectPhase[i].split(','));
              if(i > 0){
                 heatmapData[0].x.push( new Date(parseFloat(phaseData[i][0])));
              }
         }
         console.log('phaseData:  ', phaseData);
         for(let i = 2 ; i < phaseData[0].length; i++){
          heatmapData[0].y.push(phaseData[0][i])
         }
  });

 

  get('https://raw.githubusercontent.com/AsherLecover/Graph-Data/master/data_example.csv', function(jsonObject) {

     jsonObject = jsonObject.split(/\r?\n|\r/);
    for (var i = 0; i < jsonObject.length; i++) {
      csvData.push(jsonObject[i].split(','));

      rpmData[0].x.push(csvData[i][0])
      rpmData[0].y.push( csvData[i][2])

      movementFastData[0].x.push(csvData[i][0])
      movementFastData[0].y.push(parseInt( csvData[i][5]))

      distanceData[0].x.push(csvData[i][0])
      distanceData[0].y.push(csvData[i][3])
    }
    // console.log(csvData);
    

  


    get('https://raw.githubusercontent.com/AsherLecover/Graph-Data/master/treatment-example.csv', function(jsonObjectTreatment) {

      jsonObjectTreatment = jsonObjectTreatment.split(/\r?\n|\r/);
      for (var i = 0; i < jsonObjectTreatment.length; i++) {
        treatmentData.push(jsonObjectTreatment[i].split(','));
        if(i > 0){
           rpmDataPoints[0].y.push(treatmentData[i][2])
           rpmDataPoints[0].x.push(treatmentData[i][0])
        }
        
    }
    });
  
  });


//----------------------------------------------------------------------------------------------

var rpmDiv = document.getElementById("rpmDiv");
var dotsDiv = document.getElementById("dotsDiv");
var mfDiv = document.getElementById("mfDiv");
var distanceDiv = document.getElementById("distanceDiv");
var heatmapDiv = document.getElementById("heatmapDiv");



layoutRPM = { 
    hovermode:'closest',
    title:'<br> click on a point to plot an annotation',
    xaxis:{zeroline:false, title: 'Time '},
    yaxis:{zeroline:false, title: 'RPM'}
 };

 layoutDots = { 
  hovermode:'closest',
  title:'<br> click on a point to plot an annotation',
  xaxis:{zeroline:false, title: 'Time '},
  yaxis:{zeroline:false, title: 'Distance'}
};



 layoutMovementFast = { 
    hovermode:'closest',
    title:'<br> click on a point to plot an annotation',
    xaxis:{zeroline:false, title: 'Time '},
    yaxis:{zeroline:false, title: 'Movement Fast'}
 };


 layoutDistance = { 
    hovermode:'closest',
    title:'<br> click on a point to plot an annotation',
    xaxis:{zeroline:false, title: 'Time '},
    yaxis:{zeroline:false, title: 'Distance'}
 };



var data = rpmData;
var data1 = rpmDataPoints;
var data2 = movementFastData;
var data3 = distanceData;
var data4 = distanceData;



Plotly.plot(rpmDiv, data, layoutRPM);
Plotly.plot(dotsDiv, data1, layoutDots);
Plotly.plot(mfDiv, data2, layoutMovementFast);
Plotly.plot(distanceDiv, data3, layoutDistance);
Plotly.newPlot('heatmapDiv', heatmapData);


var divs = [rpmDiv, dotsDiv, mfDiv, distanceDiv, heatmapDiv];

function relayout(ed, divs) {
  divs.forEach((div, i) => {
    let x = div.layout.xaxis;
    if (ed["xaxis.autorange"] && x.autorange) return;
    if (
      x.range[0] != ed["xaxis.range[0]"] ||
      x.range[1] != ed["xaxis.range[1]"]
    )
      Plotly.relayout(div, ed);
  });
}

var plots = [rpmDiv, dotsDiv, mfDiv, distanceDiv, heatmapDiv];
plots.forEach(div => {
  div.on("plotly_relayout", function(ed) {
    relayout(ed, divs);
  });
});


