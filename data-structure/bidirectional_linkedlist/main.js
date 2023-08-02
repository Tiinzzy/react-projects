const Bidirectional_LinkedList = require('./Bidirectional_LinkedList');
const HashMap = require('./Hashmap');

const linkedList = new Bidirectional_LinkedList();
const Hashedmap = new HashMap();

const OrganizationTree = require('./OrganizationTree');
const Node = require('./OrNode');

let orgTree = new OrganizationTree();
let root = orgTree.add_child('Tina');
let fChild = orgTree.add_child('Mimi', root);
orgTree.show_org_chart();

// Hashedmap.insert('Tina', 1);
// Hashedmap.insert('Kamran', 2);
// Hashedmap.insert('TERTER', 'POOP');

// Hashedmap.showAll();
// console.log('------------------------')
// console.log(Hashedmap.get('TERTER'))
// console.log(Hashedmap.get('Sara'))


// console.log('------------------------')
// console.log(Hashedmap.remove('Tina'))
// console.log(Hashedmap.remove('TERTER'))
// console.log(Hashedmap.remove('TERTER'))
// console.log(Hashedmap.remove('ZERTERTER'))


// Hashedmap.showAll();
