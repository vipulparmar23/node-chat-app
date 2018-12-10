const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {


    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Professionals'
        },
        {
            id: '2',
            name: 'Vipul',
            room: 'Javascript group'
        },
        {
            id: '3',
            name: 'Jane',
            room: 'Node Professionals'
        }];
    }); 

    it('should add new user', () => {
        var users = new Users();

    var user = {
        id: '123',
        name: 'Andrew',
        room: 'The Office Fans'
    };

    var resultUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
    });

    it('should return names for node professionals', () => {
        var userList = users.getUserList('Node Professionals');

        expect(userList).toEqual(['Mike', 'Jane']);
    });

    it('should return names for jaascript group', () => {
        var userList = users.getUserList('Javascript group');

        expect(userList).toEqual(['Vipul']);
    });

    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = '99';
        var user = users.getUser(userId);

        expect(user).toBeFalsy();
    });

});