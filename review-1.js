import React, {
    useState,
    useEffect
} from 'react';

export function UserList() {
    const [users, addListUsers] = useState('');
    const rights = {reportStats: true, validate: true};

    useEffect(() => {
        fetchUserList();
    })

    const fetchUserList = () => {
        let list = fetch('https://fakeapi.com/users');

        let data;
        list.forEach(user => {
            switch (true) {
                case user.role == 'admin':
                    data = {
                        name: user.name,
                        role: user.role,
                        permissions: [],
                    }
                    Object.keys(rights).forEach(permission => {
                        if (rights[permission]) {
                            if (permission === 'reportStats') {
                                data.permissions.push('report-stats')
                            } else {
                                data.permissions.push(permission);
                            }
                        }
                    })
                    break;
                case user.role == 'regular':
                    data = {
                        name: user.name,
                        role: user.role,
                    }
            }
            return data;
        })

        addListUsers(data);
    }

    const selectUser = (id) => {
        let user;
        users.forEach((item) => {
            if (item.id == id) user = item;
        })

        console.log('user: ', user);
    }


    return (
        <div className="users-list">
            {users.map(user => (
                <div onClick={selectUser(user.id)}>
                    <div>{user.name}</div>
                    <div>{user.role}</div>
                    <div>{user.permissions}</div>
                </div>
            ))}
        </div>
    )
}
