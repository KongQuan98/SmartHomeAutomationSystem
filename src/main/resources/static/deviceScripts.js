async function fetchDevices() {
    try {
        const response = await fetch('/getAllDevice');
        const data = await response.json();
        const deviceList = document.getElementById('deviceList');
        deviceList.innerHTML = '';

        for (const device of data) {
            const tr = document.createElement('tr');
            tr.setAttribute('data-device-id', device.id);
            const roomName = await convertRoomIDtoName(device.room_id);
            tr.innerHTML = `
                <td>${device.device_name}</td>
                <td>${device.device_type}</td>
                <td>${roomName}</td>
                <td>
                    <button onclick="editDevice(${device.id})">Edit</button>
                    <button onclick="deleteDevice(${device.id})">Delete</button>
                </td>
            `;
            deviceList.appendChild(tr);
        }
    } catch (error) {
        console.error('Error fetching devices:', error);
    }
}

function fetchRoomList(roomElement, selectedRoom) {
    fetch('/getAllRoom')
        .then(response => response.json())
        .then(data => {
            const roomSelect = document.getElementById(roomElement);
            roomSelect.innerHTML = '';
            if (data.length === 0) {
                const option = document.createElement('option');
                option.text = 'No room available';
                option.disabled = true;
                option.selected = true;
                roomSelect.appendChild(option);
            } else {
                data.forEach(room => {
                    const option = document.createElement('option');
                    option.value = room.id;
                    option.text = room.roomName;
                    if (selectedRoom && selectedRoom === room.roomName) {
                        option.selected = true;
                    }
                    roomSelect.appendChild(option);
                });
            }
        })
        .catch(error => console.error('Error fetching room list:', error));
}

function addDevices(event) {
    event.preventDefault();
    const deviceName = document.getElementById('deviceName').value;
    const deviceType = document.getElementById('deviceType').value;
    const roomID = document.getElementById('roomSelect').value;

    const user = {
        device_name: deviceName,
        device_type: deviceType,
        room_id: roomID
    };

    fetch('/addDevice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchDevices(); // Refresh the user list
    })
    .catch(error => console.error('Error adding device:', error));
}

function editDevice(deviceId) {
    const row = document.querySelector(`tr[data-device-id='${deviceId}']`);
    const cells = row.getElementsByTagName('td');

    const deviceName = cells[0].innerText;
    const deviceType = cells[1].innerText;
    const room = cells[2].innerText;

    cells[0].innerHTML = `<input type="text" value="${deviceName}" id="editDeviceName${deviceId}">`;
    cells[1].innerHTML = `
        <select id="editDeviceType${deviceId}">
            <option value="Camera" ${deviceType === "Camera" ? "selected" : ""}>Camera</option>
            <option value="Thermostat" ${deviceType === "Thermostat" ? "selected" : ""}>Thermostat</option>
        </select>`;
    cells[2].innerHTML = `
        <select id="editRoomID${deviceId}">
        </select>
    `;
    fetchRoomList(`editRoomID${deviceId}`, room);
    cells[3].innerHTML = `
        <button onclick="saveDevice(${deviceId})">Save</button>
        <button onclick="cancelEdit(${deviceId}, '${deviceName}', '${deviceType}', '${room}')">Cancel</button>
    `;
}

function saveDevice(deviceId) {
    const deviceName = document.getElementById(`editDeviceName${deviceId}`).value;
    const DeviceType = document.getElementById(`editDeviceType${deviceId}`).value;
    const roomId = document.getElementById(`editRoomID${deviceId}`).value;

    const device = {
        id: deviceId,
        device_name: deviceName,
        device_type: DeviceType,
        room_id: roomId
    };

    fetch(`/updateDevice/${deviceId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(device)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Updated:', data);
        fetchDevices(); // Refresh the device list
    })
    .catch(error => console.error('Error updating device:', error));
}

function deleteDevice(deviceId) {
    fetch(`/deleteDevice/${deviceId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Deleted:', data);
        fetchDevices(); // Refresh the user list
    })
    .catch(error => console.error('Error deleting user:', error));
}


function cancelEdit(deviceId, deviceName, deviceType, room) {
    const row = document.querySelector(`tr[data-device-id='${deviceId}']`);
    const cells = row.getElementsByTagName('td');

    cells[0].innerText = deviceName;
    cells[1].innerText = deviceType;
    cells[2].innerText = room;
    cells[3].innerHTML = `
        <button onclick="editDevice(${deviceId})">Edit</button>
        <button onclick="deleteDevice(${deviceId})">Delete</button>
    `;
}

function convertRoomIDtoName(roomId) {
     return fetch(`/getRoom/${roomId}`)
        .then(response => response.json())
        .then(data => data.roomName)
        .catch(error => {
            console.error('Error fetching room:', error);
            return 'Unknown Room';
        });
}
