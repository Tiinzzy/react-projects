const fs = require("fs");
var args = process.argv.slice(2);

main(args[0], args[1]);

//----------------------------------------------
function main(user, file) {
  user = user || null;
  file = file || null;

  let data = readData("./users.txt")

  if (user !== null) {
    let friends = getFriends(data, user, 0);
    showFriends(friends);
    if (file !== null) {
      saveAsJsonFriends(file + '-friends.json', friends);
    }
  }
}

//----------------------------------------------
function showFriends(friends) {
  friends.forEach((e, i) => {
    console.log(1 + i, e);
  });
}

//----------------------------------------------
function saveAsJsonFriends(file, friends) {
  fs.writeFile(file, JSON.stringify(friends), function (err) {
    if (err) throw err;
    console.log(file + ' created successfully.');
  });
}

//----------------------------------------------
function getFriends(data, user, level) {
  let result = [];
  if (level === 0) {
    data.forEach(p => {
      if (p.user === user) {
        result = result.concat(p.friends);
      }
    });
  } else if (level > 0) {

  }

  return result;
}


//----------------------------------------------
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


