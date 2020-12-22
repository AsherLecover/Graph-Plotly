var csvData = new Array();
var rpmData = [{x: [],y:[]}];
var movementFastData = [{x: [],y:[]}];
var distanceData = [{x: [],y:[]}];

var phaseData = new Array();



    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 200) {
        var jsonObject = request.responseText.split(/\r?\n|\r/);
        for (var i = 0; i < jsonObject.length; i++) {
          csvData.push(jsonObject[i].split(','));
        }
        
        for (let i = 1 ; i <  csvData.length; i++) {
            rpmData[0].x.push(csvData[i][0])
            rpmData[0].y.push(csvData[i][2])

            movementFastData[0].x.push(csvData[i][0])
            movementFastData[0].y.push(parseInt( csvData[i][5]))

            distanceData[0].x.push(csvData[i][0])
            distanceData[0].y.push(csvData[i][3])
           
           }
        }

    };
    request.open("GET", 'https://raw.githubusercontent.com/AsherLecover/Graph-Data/master/data_example.csv', false);   
    request.send(null);  

//-----------------------------------------------------------------------------------------------


// var request = new XMLHttpRequest();
// function get(url, callback) {
//     request.onreadystatechange = function() {
//       if (request.readyState === 4 && request.status === 200) {
//         if ('function' === typeof callback) {
//           callback(request.responseText);
//         }
//       }
//     };
//     request.open('GET', url, false)
//     // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     request.send();
//   }

//   get('https://raw.githubusercontent.com/AsherLecover/Graph-Data/master/data_example.csv', function(jsonObject) {

//      jsonObject = request.responseText.split(/\r?\n|\r/);
//     for (var i = 0; i < jsonObject.length; i++) {
//       csvData.push(jsonObject[i].split(','));
//     }
    
//     for (let i = 1 ; i <  csvData.length; i++) {
//         rpmData[0].x.push(csvData[i][0])
//         rpmData[0].y.push(csvData[i][2])

//         movementFastData[0].x.push(csvData[i][0])
//         movementFastData[0].y.push(parseInt( csvData[i][5]))

//         distanceData[0].x.push(csvData[i][0])
//         distanceData[0].y.push(csvData[i][3])
       
//        }
  
//     get('https://raw.githubusercontent.com/AsherLecover/Graph-Data/master/phase-example.csv', function(jsonObjectA) {

//          jsonObjectA = jsonObjectA.responseText.split(/\r?\n|\r/);
//             for (var i = 0; i < jsonObjectA.length; i++) {
//                 phaseData.push(jsonObjectA[i].split(','));
//             }
//     });
  
//   });



// var requesta = new XMLHttpRequest();
// requesta.onreadystatechange = function() {

//   if (this.readyState == 4 && this.status == 200) {
//     var jsonObjectA = jsonObjectA.responseText.split(/\r?\n|\r/);
//     for (var i = 0; i < jsonObjectA.length; i++) {
//         phaseData.push(jsonObjectA[i].split(','));
//     }
    
  
//     }

// };
// requesta.open("GET", 'https://raw.githubusercontent.com/AsherLecover/Graph-Data/master/phase-example.csv', false);   
// requesta.send(null); 

// console.log('phaseData:', phaseData);

//----------------------------------------------------------------------------------------------

var myDiv = document.getElementById("myDiv");
var myDiv2 = document.getElementById("myDiv2");
var myDiv3 = document.getElementById("myDiv3");



layoutRPM = { 
    hovermode:'closest',
    title:'<br> click on a point to plot an annotation',
    xaxis:{zeroline:false, title: 'Time '},
    yaxis:{zeroline:false, title: 'RPM'}
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
var data2 = movementFastData;
var data3 = distanceData;



Plotly.plot(myDiv, data, layoutRPM);
Plotly.plot(myDiv2, data2, layoutMovementFast);
Plotly.plot(myDiv3, data3, layoutDistance);



var divs = [myDiv, myDiv2, myDiv3];

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

var plots = [myDiv, myDiv2, myDiv3];
plots.forEach(div => {
  div.on("plotly_relayout", function(ed) {
    relayout(ed, divs);
  });
});


