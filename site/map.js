
// WORLD    https://bl.ocks.org/mbostock/raw/eec4a6cda2f573574a11/
// US       https://bl.ocks.org/mbostock/raw/4090848/
// Patterns http://bl.ocks.org/dwtkns/7405490
$( document ).ready(function() {

  var docWidth = document.documentElement.clientWidth;
  var docHeight = document.documentElement.clientHeight;
  var maxHeight = docHeight * 0.5;
  var width = $('#map-stage').width();
  var height = width * 0.5;
  var scale0 = width;

  if (height > maxHeight){
    height = maxHeight;
  }

  var projection = d3.geo.albersUsa();

  var zoom = d3.behavior.zoom()
      .translate([width / 2, height / 2])
      .scale(scale0)
      .scaleExtent([scale0, 8 * scale0])
      .on("zoom", zoomed);

  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("#map-stage")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .call(zoom)
    .call(zoom.event);

  d3.json("us.json", function(error, us) {
    if (error) throw error;

    $.each(us.objects.states.geometries, function(index,value){ 
      createPattern(value.id)
    });

    svg.append("g")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter()
      .append("path")
      .style("fill", function(d) {
           return 'url(#img-' + d.id + ')';
      })
      .attr({
        class: 'state',
        d:path
      })
      .on('mousedown.log', function (d) {
        console.log(d.id);
        setTimeout(function(){
          $('#modal-dialog-state-1').click();
        }, 0);
      });
  });

  function createPattern(id){
    var rotation = Math.floor(Math.random() * 360) + 1  ;
    svg
      .append("pattern")
      .attr({
        id:'img-' + id,
        width:"20",
        height:"20",
        patternUnits:"userSpaceOnUse",
        patternTransform:"rotate(" + rotation + ")"
      })
      .append("image")
      .attr({
        'xmlns:xlink':'http://www.w3.org/1999/xlink',
        'xlink:href':'img/tile/' + id + '.jpg',
        transform:"translate(0,0)",
        x: '0',
        y: '0',
        width: '20',
        height: '20'
      });
  }

  function zoomed() {
    projection
        .translate(zoom.translate())
        .scale(zoom.scale());

    svg.selectAll("path")
      .attr("d", path);
  }

  d3.select(self.frameElement).style("height", height + "px");

});