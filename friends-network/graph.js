// ---------------------------------------------------------------
class Person {
    constructor(name) {
      this.name = name;
      this.friends = [];
    }
  
    getName() {
      return this.name;
    }
  
    getFriends() {
      return this.friends;
    }
  
    addFriend(friendObject) {
      this.friends.push(friendObject);
    }
  
    show() {
      console.log(this.name, '=>', this.friends);
    }
  }

// ---------------------------------------------------------------
console.log('Create Linked List -------------------------------')
mainLinkedList();

// --------------------------------------------------------------------------------
function mainLinkedList() {
var k = new Person('kamran');
    var ki = new Person('kiana');
    
    k.addFriend(ki);
  
    var t = new Person('tina');
    t.show();
  
    t.addFriend(k)
    t.addFriend(ki)
    t.show(); 
  }