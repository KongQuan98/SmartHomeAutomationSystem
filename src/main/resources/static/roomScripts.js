function fetchRoom() {
    fetch('/getAllRoom')
        .then(response => response.json())
        .then(data => {
            const roomList = document.getElementById('roomList');
            roomList.innerHTML = '';
            data.forEach(room => {
                const tr = document.createElement('tr');
                tr.setAttribute('data-room-id', room.id);
                tr.innerHTML = `
                    <td>${room.roomName}</td>
                    <td>0</td>
                    <td>
                        <button onclick="editRoom(${room.id})">Edit</button>
                        <button onclick="deleteRoom(${room.id})">Delete</button>
                    </td>
                `;
                roomList.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching room:', error));
}

function addRoom(event) {
    event.preventDefault();
    const roomName = document.getElementById('roomName').value;

    const room = {
        roomName: roomName,
    };

    fetch('/addRoom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchRoom(); // Refresh the user list
    })
    .catch(error => console.error('Error adding room:', error));
}

function editRoom(roomId) {
    const row = document.querySelector(`tr[data-room-id='${roomId}']`);
    const cells = row.getElementsByTagName('td');

    const roomName = cells[0].innerText;

    cells[0].innerHTML = `<input type="text" value="${roomName}" id="editRoomName${roomId}">`;
    cells[2].innerHTML = `
        <button onclick="saveRoom(${roomId})">Save</button>
        <button onclick="cancelEditRoom(${roomId}, '${roomName}')">Cancel</button>
    `;
}

function saveRoom(roomId) {
    const roomName = document.getElementById(`editRoomName${roomId}`).value;

    const room = {
        id: roomId,
        roomName: roomName,
    };

    fetch(`/updateRoom/${roomId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Updated:', data);
        fetchRoom(); // Refresh the user list
    })
    .catch(error => console.error('Error updating room:', error));
}

function deleteRoom(roomId) {
    fetch(`/deleteRoom/${roomId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Deleted:', data);
        fetchRoom(); // Refresh the user list
    })
    .catch(error => console.error('Error deleting room:', error));
}

function cancelEditRoom(roomId, roomName) {
    const row = document.querySelector(`tr[data-room-id='${roomId}']`);
    const cells = row.getElementsByTagName('td');

    cells[0].innerText = roomName;
    cells[2].innerHTML = `
        <button onclick="editRoom(${roomId})">Edit</button>
        <button onclick="deleteRoom(${roomId})">Delete</button>
    `;
}