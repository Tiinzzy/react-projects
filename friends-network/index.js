const fs = require("fs");
var args = process.argv.slice(2);

if (args.length >= 1) {
  main(args[0], args[1], args[2]);
} else {
  console.log('Syntax: node index.js user [level] [filename]')
}

//----------------------------------------------
function main(user, level, file) {
  user = user || null;
  file = file || null;
  level = (level || 0) * 1;

  let data = readData("./users.txt")

  if (user !== null) {
    let friends = getFriends(data, user, level);
    showFriends(friends);
    if (file !== null) {
      saveAsJsonFriends(file + '-friends.json', friends);
    }
  }
}

//----------------------------------------------
function showFriends(friends) {
  console.log(friends);
  // friends.forEach((e, i) => {
  //   console.log(1 + i, e);
  // });
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
  let result = {};
  let alreadySeen = new Set();

  for (let l = 0; l <= level; l++) {
    if (l === 0) {
      let zeroLevelFriends = getL0Friends(data, user);
      result[l.toString()] = zeroLevelFriends;
      alreadySeen = new Set([...zeroLevelFriends]);
    } else {
      let nextLevelFriends = [];
      result[(l - 1).toString()].forEach(f => {
        let tempResult = getL0Friends(data, f);
        nextLevelFriends = nextLevelFriends.concat(tempResult);
      });
      nextLevelFriends = cleanResult(nextLevelFriends, user);
      result[l.toString()] = nextLevelFriends;
      if (l < level) {
        alreadySeen = new Set([...alreadySeen, ...nextLevelFriends]);
      }
    }
  }

  result = result[level.toString()];
  result = result.filter(f => !alreadySeen.has(f));
  return result;
}

function cleanResult(array, user) {
  let result = [... new Set(array)];
  result = result.filter(e => e !== user);
  return result;
}

//----------------------------------------------
function getL0Friends(data, user) {
  let result = [];
  data.forEach(p => {
    if (p.user === user) {
      result = result.concat(p.friends);
    }
  });
  result = cleanResult(result, user);
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


