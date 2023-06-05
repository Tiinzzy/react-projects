let animals = [{ type: 'lion' }, 'tiger'];
let clones = animals.slice();

console.log(clones);

clones[0].type = 'bear';
clones[1] = 'sheep';

console.log(animals[0].type, clones[0].type);
console.log(animals[1], clones[1]);