function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tab-content");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
    if (tabName === 'userProfile') {
       fetchUsers();
    } else if (tabName === 'rooms') {
       fetchRoom();
    } else if (tabName === 'smartDevices') {
        fetchDevices();
        fetchRoomList('roomSelect');
    } else if (tabName === 'config') {
        fetchRoomsAndDevices();
    }
}

// Open the first tab by default
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".tab-button").click();
    document.getElementById('userProfileForm').addEventListener('submit', addUser);
    document.getElementById('roomsForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addRoom(event);
        openTab('rooms');
    });
    document.getElementById('smartDevicesForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addDevices(event);
        openTab('smartDevices');
    });
});

const draggableItems = document.querySelectorAll('.draggable');

draggableItems.forEach(item => {
    item.addEventListener('dragstart', dragStart);
});

document.querySelector('.floor-plan').addEventListener('dragover', dragOver);
document.querySelector('.floor-plan').addEventListener('drop', drop);

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = document.querySelector('.floor-plan'); // Ensure the dropzone is the floor-plan container

    const offsetX = event.offsetX - draggableElement.offsetWidth / 2;
    const offsetY = event.offsetY - draggableElement.offsetHeight / 2;

    draggableElement.style.left = `${offsetX}px`;
    draggableElement.style.top = `${offsetY}px`;
    dropzone.appendChild(draggableElement); // Append the draggable element to the floor-plan container
}