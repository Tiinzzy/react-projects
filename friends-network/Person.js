module.exports = class Person {
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
    console.log('SETTING ' + this.name + ' TO ' + state);
    this.state = state;
  }

  addFriend(friendObject) {
    this.friends.push(friendObject);
  }

  show() {
    console.log(this.name, '(' + this.state + ')', ' => ', this.friends.map(e => (e.getName() + '[' + e.getState() + ']')).join(','));
  }
}