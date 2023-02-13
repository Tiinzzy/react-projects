var util = require('util');
var graphviz = require('graphviz');

function displayGraphvis() {
    var graph = graphviz.digraph("G");

    var n1 = g.addNode("Hello", { "color": "blue" });
    n1.set("style", "filled");
    g.addNode("World");
    var e = g.addEdge(n1, "World");
    e.set("color", "red");
    console.log(g.to_dot());
    g.setGraphVizPath("/usr/bin");
    g.output("svg", "/home/tina/Downloads/test01.svg");
  }