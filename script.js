var myDiv = document.getElementById("myDiv");
var myDiv2 = document.getElementById("myDiv2");
var myDiv3 = document.getElementById("myDiv3");
var startTime = new Date().getTime();
var timeStep = 60000;
var myDivMax = 70;
var myDiv2Max = 9000;
var myDiv3Max = 500;

var d3 = Plotly.d3,
  N = 40,
  x = d3.range(N).map(() => {
    return new Date((startTime += timeStep));
  }),
  y = d3.range(N).map(() => Math.random() * myDivMax),
  data = [{ x: x, y: y }];
var layout = {
  height: 200,
  margin: { l: 45, t: 5, r: 45, b: 45 },
  xaxis: {
    tickfont: {
      size: 10,
      color: "#7f7f7f"
    }
  },
  yaxis: {
    fixedrange: true,
    tickfont: {
      size: 10,
      color: "#7f7f7f"
    }
  }
};
var layout2 = {
  height: 200,
  margin: { l: 45, t: 5, r: 45, b: 45 },
  xaxis: {
    tickfont: {
      size: 10,
      color: "#7f7f7f"
    }
  },
  yaxis: {
    fixedrange: true,
    tickfont: {
      size: 10,
      color: "#7f7f7f"
    }
  }
};
var layout3 = {
  height: 200,
  margin: { l: 45, t: 5, r: 45, b: 45 },
  xaxis: {
    tickfont: {
      size: 10,
      color: "#7f7f7f"
    }
  },
  yaxis: {
    fixedrange: true,
    tickfont: {
      size: 10,
      color: "#7f7f7f"
    }
  }
}; 

Plotly.plot(myDiv, data, layout);
var data2 = [{ x: x, y: d3.range(N).map(() => Math.random() * myDiv2Max) }];
Plotly.plot(myDiv2, data2, layout2);
var data3 = [{ x: x, y: d3.range(N).map(() => Math.random() * myDiv3Max) }];
Plotly.plot(myDiv3, data3, layout3);

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
    console.log(ed);
    relayout(ed, divs);
  });
});