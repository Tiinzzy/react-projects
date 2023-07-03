const Bidirectional_LinkedList = require('./Bidirectional_LinkedList');

const linkedList = new Bidirectional_LinkedList();


linkedList.add(1)
linkedList.add(2)
linkedList.add(3)
linkedList.add(4)

console.log(linkedList.get_head(), linkedList.get_tail())

let show = linkedList.show_all()
console.log(show)

linkedList.remove(2)
console.log(linkedList.show_all())
linkedList.remove(0)
console.log(linkedList.show_all())

linkedList.add(10, 0)
console.log(linkedList.show_all())
linkedList.add({ a: 1, name: 'tina' }, 2)
console.log(linkedList.show_all())

console.log(linkedList.find_first((e) => { return e.a === 1 }))