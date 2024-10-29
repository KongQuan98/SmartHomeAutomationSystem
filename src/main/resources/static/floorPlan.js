document.addEventListener('DOMContentLoaded', () => {
    fetchRoomsAndDevices();
});

function fetchRoomsAndDevices() {
    Promise.all([fetch('/getAllRoom'), fetch('/getAllDevice')])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(([rooms, devices]) => {
            drawFloorPlan(rooms, devices);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function drawFloorPlan(rooms, devices) {
    const floorPlan = document.getElementById('dynamicFloorPlan');
    floorPlan.innerHTML = ''; // Clear existing content

    rooms.forEach(room => {
        const roomElement = document.createElement('div');
        roomElement.className = 'room';
        roomElement.innerText = room.roomName;
        roomElement.style.textAlign = 'center';
        roomElement.style.fontWeight = 'bold';
        floorPlan.appendChild(roomElement);

        devices.filter(device => device.room_id === room.id).forEach(device => {
            const deviceElement = document.createElement('div');
            deviceElement.className = 'device';
            deviceElement.innerText = device.device_name;
            deviceElement.addEventListener('click', () => showDeviceConfig(device));
            roomElement.appendChild(deviceElement);
        });
    });
}

let selectedDeviceElement = null;

function showDeviceConfig(device) {
    // Remove the selected class from the previously selected device
    if (selectedDeviceElement) {
        selectedDeviceElement.classList.remove('selected-device');
    }

    // Find the clicked device element and add the selected class
    const deviceElements = document.querySelectorAll('.device');
    deviceElements.forEach(element => {
        if (element.innerText === device.device_name) {
            element.classList.add('selected-device');
            selectedDeviceElement = element;
        }
    });

    const configContainer = document.getElementById('deviceConfigContainer');
    configContainer.innerHTML = `
        <h2>Configure ${device.device_name}</h2>
        <div id="configContent"></div>
    `;

    const configContent = document.getElementById('configContent');
    if (device.device_type === 'Camera') {
        configContent.innerHTML = `
            <label>Active Recording Time: <input type="text" id="recordingTime"></label>
            <label>Backup Footage Schedule: <input type="text" id="backupSchedule"></label>
        `;
    } else if (device.device_type === 'Thermostat') {
        configContent.innerHTML = `
            <label>Backup Data Schedule: <input type="text" id="backupDataSchedule"></label>
        `;
    }
}