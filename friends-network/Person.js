module.exports = function Person(name) {
  this.name = name;
  this.friends = [];
  this.state = 'normal';

  this.getName = function () {
    return this.name;
  }

  this.getFriends = function () {
    return this.friends;
  }

  this.getState = function () {
    return this.state;
  }

  this.setState = function (state) {
    console.log('SETTING ' + this.name + ' TO ' + state);
    this.state = state;
  }

  this.addFriend = function (friendObject) {
    this.friends.push(friendObject);
  }

  this.show = function () {
    console.log(this.name, '(' + this.state + ')', ' => ', this.friends.map(e => (e.getName() + '[' + e.getState() + ']')).join(','));
  }
}
