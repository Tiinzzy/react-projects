const fs = require("fs");
const Person = require('./Person');

var util = require('util');
var graphviz = require('graphviz');

var people = [];

// ---------------------------------------------------------------
mainLinkedList();


// --------------------------------------------------------------------------------
function mainLinkedList() {
  showPeople();

  setPopulation();
  showPeople();

  setPeopleFriends();
  showPeople();

  // someTests();
  // let networkAsText = getDotGraphDataAsText();

  saveRelatinshipAsSvg();
}

// -------------------------------------------------------------------------------
// some manula test to understand the connections 
// we need to understand the difference between class and instance (object)
// -------------------------------------------------------------------------------
function someTests() {
  let t = getPerson('tina');
  t.setState('HAPPY');

  t.getFriends()[0].getFriends()[1].setState('Angry');
  t.getFriends()[0].getFriends()[1].show();

  let k = getPerson('kamran');
  k.show();
}

// ----------------------------------------------------------------------------
function setPeopleFriends() {
  let data = readData("./users.txt")
  data.forEach(d => {
    let pu = getPerson(d.user);
    if (pu !== null) {
      d.friends.forEach(f => {
        let pf = getPerson(f);
        if (pf !== null) {
          pu.addFriend(pf);
        }
      });
    };
  });
}

// ----------------------------------------------------------------------------
function setPopulation() {
  let data = readData("./users.txt")
  data.forEach(d => {
    if (!nameExist(d.user)) {
      people.push(new Person(d.user));
    }
    d.friends.forEach(f => {
      if (!nameExist(f)) {
        people.push(new Person(f));
      }
    });
  });
}

// ----------------------------------------------------------------------------
function readData(filename) {
  const file = fs.readFileSync(filename, 'utf8');
  const lines = file.split('\n');

  let data = [];
  for (let l in lines) {
    let line = lines[l];
    let userFriends = line.split(':');
    if (userFriends.length === 2) {
      let user = userFriends[0].trim();
      let friends = userFriends[1].split(',').map(e => e.trim()).filter(Boolean);
      if (friends.length > 0) {
        data.push({ user, friends });
      }
    }
  }
  return data;
}

//-----------------------------------------------------------------------------
function nameExist(name) {
  let result = false;
  people.forEach(p => {
    if (p.getName() === name) {
      result = true;
    }
  });
  return result;
}

//-----------------------------------------------------------------------------
function getPerson(name) {
  let result = null;
  people.forEach(p => {
    if (p.getName() === name) {
      result = p;
    }
  });
  return result;
}

//-----------------------------------------------------------------------------
function showPeople() {
  people.map(p => {
    p.show();
  });
  console.log('\n**********************************************\n');
}

//-----------------------------------------------------------------------------
function getDotGraphDataAsText() {
  let relationship = getAllRelationships();
  let dg = '';

  relationship.forEach(r => {
    dg = dg + ' ' + r[0] + ' -> ' + r[1] + ';\n';
  });

  dg = 'digraph Frineds {\n' + dg + '}';
  return dg;
}

//-----------------------------------------------------------------------------
function getAllRelationships() {
  let relationship = [];
  people.forEach(p => {
    let fromPerson = p.getName();
    p.getFriends().forEach(f => {
      let toPerson = f.getName();
      relationship.push([fromPerson, toPerson]);
    });
  });

  return relationship;
}


//-----------------------------------------------------------------------------
function testGraphvis() {
  var g = graphviz.digraph("G");
  var n1 = g.addNode("Hello", { "color": "blue" });
  n1.set("style", "filled");
  g.addNode("World");
  var e = g.addEdge(n1, "World");
  e.set("color", "red");
  console.log(g.to_dot());
  g.setGraphVizPath("/usr/bin");
  g.output("svg", "/home/tina/Downloads/test01.svg");
}

//-----------------------------------------------------------------------------
function saveRelatinshipAsSvg() {
  var g = graphviz.digraph("G");

  people.map(p => p.getName()).forEach(n => {
    var style = {};
    if (n === 'tina') {
      style = { "shape": "hexagon" };
    }
    g.addNode(n, style);
  });

  people.forEach(p => {
    let fromPerson = p.getName();
    p.getFriends().forEach(f => {
      let toPerson = f.getName();
      g.addEdge(fromPerson, toPerson, { "minlen": 2 });
    });
  });

  g.setGraphVizPath("/usr/bin");
  g.output("svg", "/home/tina/Downloads/wirkshop.svg");
}
