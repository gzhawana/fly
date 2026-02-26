// renderer.js

const { ipcRenderer } = require('electron');

// Simple router function
function router() {
    const view = window.location.hash.substring(1);
    if (view) {
        loadView(view);
    } else {
        loadView('home');
    }
}

// Load view based on routing
function loadView(view) {
    const contentDiv = document.getElementById("content");
    switch (view) {
        case 'home':
            contentDiv.innerHTML = `<h1>Home</h1>`;
            fetchData();
            break;
        case 'about':
            contentDiv.innerHTML = `<h1>About</h1>`;
            break;
        default:
            contentDiv.innerHTML = `<h1>404: View Not Found</h1>`;
            break;
    }
}

// Fetch data from API
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        renderTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Render data in a table
function renderTable(data) {
    const tableDiv = document.getElementById("table");
    let tableHTML = `<table><tr><th>ID</th><th>Name</th><th>Value</th></tr>`;
    data.forEach(item => {
        tableHTML += `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.value}</td></tr>`;
    });
    tableHTML += `</table>`;
    tableDiv.innerHTML = tableHTML;
}

// IPC communication example
ipcRenderer.on('message-from-main', (event, message) => {
    console.log('Message from main process:', message);
});

// Event listeners for routing
window.addEventListener('hashchange', router);
window.addEventListener('load', router);