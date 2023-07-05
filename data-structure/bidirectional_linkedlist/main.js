const Bidirectional_LinkedList = require('./Bidirectional_LinkedList');
const HashMap = require('./Hashmap');

const linkedList = new Bidirectional_LinkedList();
const Hashedmap = new HashMap();

Hashedmap.insert('Tina', 1);
Hashedmap.insert('Kamran', 2);
Hashedmap.insert('TERTER', 'POOP');

Hashedmap.showAll();
console.log('------------------------')
console.log(Hashedmap.get('TERTER'))


console.log('------------------------')
console.log(Hashedmap.remove('Tina'))
console.log(Hashedmap.remove('TERTER'))
console.log(Hashedmap.remove('TERTER'))
console.log(Hashedmap.remove('ZERTERTER'))


Hashedmap.showAll();
