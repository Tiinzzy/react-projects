const Bidirectional_LinkedList = require('./Bidirectional_LinkedList');

describe('BidirectionalLinkedList', () => {

  it('should add elements correctly', () => {
    let linkedList = new Bidirectional_LinkedList();

    linkedList.add('Kamran');
    linkedList.add('1');
    linkedList.add('Tina');
    linkedList.add('2');


    expect(linkedList.get_element(0)).toStrictEqual('Kamran');
    expect(linkedList.get_element(3)).toStrictEqual('2');
  });

  it('should add elements in between indexes correctly', () => {
    let linkedList = new Bidirectional_LinkedList();

    linkedList.add('1');
    linkedList.add('2');
    linkedList.add('3');
    linkedList.add('4');


    expect(linkedList.get_element(0)).toStrictEqual('1');
    expect(linkedList.get_element(1)).toStrictEqual('2');

    linkedList.add('1.5',1);
    expect(linkedList.get_element(1)).toStrictEqual('1.5');

  });

  it('should remove elements correctly', () => {
    let linkedList = new Bidirectional_LinkedList();

    linkedList.add('Kamran');
    linkedList.add('1');
    linkedList.add('Tina');
    linkedList.add('2');

    linkedList.remove(1);

    expect(linkedList.get_element(0)).toStrictEqual('Kamran');
    expect(linkedList.get_element(1)).toStrictEqual('Tina');
    expect(linkedList.size).toBe(3);
  });

  it('should return null for non-existing elements', () => {
    let linkedList = new Bidirectional_LinkedList();

    expect(linkedList.get_element(-1)).toBeNull();
    expect(linkedList.get_element(2)).toBeNull();
  });

});
