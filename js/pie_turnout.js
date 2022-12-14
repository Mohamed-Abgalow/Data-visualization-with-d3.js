//generate districts dynamically
d3.csv("map_data/districts.csv", function (error, data) {
    //var district = data.district_name
    //console.log(district)
    var select = d3.select("#filter_bar")
        .append("select")
        .attr("class", "form-select")
        .attr("onclick", "update_pie(this.value)")



    /*select
      .on("change", function(d) {
        var value = d3.select(this).property("value");
        alert(value);
      });*/

    select.selectAll("option")
        .data(data)
        .enter()
        .append("option")
        .attr("value", function (d) { return d.district_name; })
        .text(function (d) { return d.district_name; });
});




var svg = d3.select("svg"),
width = svg.attr("width"),
height = svg.attr("height"),
radius = Math.min(width, height) / 2;

var g = svg.append("g")
       .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

var pie = d3.pie().value(function(d) { 
    return d.percent; 
});

var path = d3.arc()
         .outerRadius(radius - 10)
         .innerRadius(0);

var label = d3.arc()
          .outerRadius(radius)
          .innerRadius(radius - 80);

d3.csv("browseruse.csv", function(error, data) {
if (error) {
    throw error;
}
var arc = g.selectAll(".arc")
           .data(pie(data))
           .enter().append("g")
           .attr("class", "arc");

arc.append("path")
   .attr("d", path)
   .attr("fill", function(d) { return color(d.data.browser); });

console.log(arc)

arc.append("text")
   .attr("transform", function(d) { 
            return "translate(" + label.centroid(d) + ")"; 
    })
   .text(function(d) { return d.data.browser; });
});

svg.append("g")
   .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
   .append("text")
   .text("Browser use statistics - Jan 2017")
   .attr("class", "title")
