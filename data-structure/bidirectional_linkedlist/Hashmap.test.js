const Hashmap = require('./Hashmap');

describe('Hashmap', () => {

  it('should insert key-value pairs correctly', () => {
    let hashmap = new Hashmap()

    hashmap.insert('Tina', { '1': 1, '2': 2 });
    hashmap.insert('Kamran', { '3': 3, '4': 4 });

    expect(hashmap.get('Tina')).toStrictEqual({ key: 'Tina', value: { '1': 1, '2': 2 } });
    expect(hashmap.get('Kamran')).toStrictEqual({ key: 'Kamran', value: { '3': 3, '4': 4 } });
  });

  it('should remove key-value pairs correctly', () => {
    let hashmap = new Hashmap()

    hashmap.insert('Tina', { '1': 1, '2': 2 });
    hashmap.insert('TERTER', 'POOP');
    hashmap.insert('Kamran', { '3': 3, '4': 4 });
    hashmap.insert('Sara', { '3': 3});

    hashmap.remove('Tina');
    hashmap.remove('Sara');

    expect(hashmap.get('Tina')).toBeNull();
    expect(hashmap.get('Sara')).toBeFalsy();
  });

  it('should return null for non-existing keys', () => {
    let hashmap = new Hashmap()
    expect(hashmap.get('Sara')).toBeNull();
  });
});
