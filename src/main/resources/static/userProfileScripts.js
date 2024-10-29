function fetchUsers() {
    fetch('/getAllUser')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('userList');
            userList.innerHTML = '';
            data.forEach(user => {
                const tr = document.createElement('tr');
                tr.setAttribute('data-user-id', user.id);
                tr.innerHTML = `
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${convertIntToRole(user.role)}</td>
                    <td>
                        <button onclick="editUser(${user.id})">Edit</button>
                        <button onclick="deleteUser(${user.id})">Delete</button>
                    </td>
                `;
                userList.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

function addUser(event) {
    event.preventDefault();
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const userRole = convertRoleToInt(document.getElementById('userRole').value);

    const user = {
        username: userName,
        email: userEmail,
        role: userRole
    };

    fetch('/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchUsers(); // Refresh the user list
    })
    .catch(error => console.error('Error adding user:', error));
}

function editUser(userId) {
    const row = document.querySelector(`tr[data-user-id='${userId}']`);
    const cells = row.getElementsByTagName('td');

    const userName = cells[0].innerText;
    const userEmail = cells[1].innerText;
    const userRole = cells[2].innerText;

    cells[0].innerHTML = `<input type="text" value="${userName}" id="editUserName${userId}">`;
    cells[1].innerHTML = `<input type="email" value="${userEmail}" id="editUserEmail${userId}">`;
    cells[2].innerHTML = `
        <select id="editUserRole${userId}">
            <option value="Administrator" ${userRole === "Administrator" ? "selected" : ""}>Administrator</option>
            <option value="Member" ${userRole === "Member" ? "selected" : ""}>Member</option>
        </select>
    `;
    cells[3].innerHTML = `
        <button onclick="saveUser(${userId})">Save</button>
        <button onclick="cancelEditUser(${userId}, '${userName}', '${userEmail}', '${userRole}')">Cancel</button>
    `;
}

function saveUser(userId) {
    const userName = document.getElementById(`editUserName${userId}`).value;
    const userEmail = document.getElementById(`editUserEmail${userId}`).value;
    const userRole = document.getElementById(`editUserRole${userId}`).value;

    const user = {
        id: userId,
        username: userName,
        email: userEmail,
        role: convertRoleToInt(userRole)
    };

    fetch(`/updateUser/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Updated:', data);
        fetchUsers(); // Refresh the user list
    })
    .catch(error => console.error('Error updating user:', error));
}

function deleteUser(userId) {
    fetch(`/deleteUser/${userId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Deleted:', data);
        setTimeout(() => {
            fetchUsers(); // Refresh the user list after a delay
        }, 500); // 500 milliseconds delay
    })
    .catch(error => console.error('Error deleting user:', error));
}

function cancelEditUser(userId, userName, userEmail, userRole) {
    const row = document.querySelector(`tr[data-user-id='${userId}']`);
    const cells = row.getElementsByTagName('td');

    cells[0].innerText = userName;
    cells[1].innerText = userEmail;
    cells[2].innerText = userRole;
    cells[3].innerHTML = `
        <button onclick="editUser(${userId})">Edit</button>
        <button onclick="deleteUser(${userId})">Delete</button>
    `;
}

function convertRoleToInt(userRole) {
    if (userRole === "Administrator") {
        return 1;
    } else {
        return 0;
    }
}

function convertIntToRole(userRole) {
    if (userRole === 1) {
        return "Administrator";
    } else {
        return "Member";
    }
}
