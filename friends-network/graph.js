const fs = require("fs");
const Person = require('./Person');

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

  getDotGraphData();
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
function getDotGraphData() {
  let relationship = getAllRelationships();
  let dg = '';

  relationship.forEach(r => {
    dg = dg + ' ' + r[0] + ' -> ' + r[1] + ';\n';
  });


  dg = 'digraph Frineds {\n' + dg + '}';
  console.log(dg);

  return null;
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