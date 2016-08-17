var g;

var initMap = function () {

  var width = document.documentElement.clientWidth || document.body.clientWidth,
      height = width * 500 / 960,
      centered;

  var projection = d3.geo.albersUsa()
      .scale(width)
      .translate([width / 2, height / 2]);

  var path = d3.geo.path()
      .projection(projection);

  d3.json("assets/js/us.json", function(error, us) {
    var mapContainer = document.getElementById('map-container');
    mapContainer.innerHTML = '';
    mapContainer.style.height = height * 1.05;

    svg = d3.select("#map-container").append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height)
        .on("click", clicked);

    g = svg.append("g");
    if (error) throw error;

    g.append("g")
        .attr("id", "states")
      .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
        .attr("d", path)
        .on("click", clicked);

    g.append("path")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
        .attr("id", "state-borders")
        .attr("d", path);
  });


  function clicked(d) {
    //looks like we can tell the state from d.id.
    var state = states_data[d.id];
    state.id = d.id;

    modalController.showState(state);

    var x, y, k;

    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;

    g.selectAll("path").classed("active", centered && function(d) { return d === centered; });

    /*
    Don't zoom. Do select the state.

    var x, y, k;

    if (d && centered !== d) {
      var centroid = path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = 4;
      centered = d;
    } else {
      x = width / 2;
      y = height / 2;
      k = 1;
      centered = null;
    }

    g.selectAll("path")
        .classed("active", centered && function(d) { return d === centered; });

    g.transition()
        .duration(750)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");
    */
  }
};

initMap();
window.addEventListener("resize", function(){
    initMap();
});

