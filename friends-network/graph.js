const fs = require("fs");

var people = [];

// ---------------------------------------------------------------
class Person {
  constructor(name) {
    this.name = name;
    this.friends = [];
    this.state = 'normal';
  }

  getName() {
    return this.name;
  }

  getFriends() {
    return this.friends;
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
  }

  addFriend(friendObject) {
    this.friends.push(friendObject);
  }

  show() {
    console.log(this.name, '(' + this.state + ')', ' => ', this.friends.map(e => (e.getName() + '[' + e.getState() + ']')).join(','));
  }
}

// ---------------------------------------------------------------
console.log('Create Linked List -------------------------------')
mainLinkedList();

// --------------------------------------------------------------------------------
function mainLinkedList() {
  showPeople();

  setPopulation();
  showPeople();

  setPeopleFriends();
  showPeople();
 
  let t = getPerson('tina');
  t.setState('HAPPY');
  
  t.getFriends()[0].getFriends()[1].setState('Angry');
  t.getFriends()[0].getFriends()[1].show();
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
  return null;
}