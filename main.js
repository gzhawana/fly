const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const { MongoClient } = require('mongodb');

let mainWindow;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'yourDatabaseName'; 

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on(' ready', () => {
    createWindow();
    launchPythonBackend();
    initDatabase();
});

function initDatabase() {
    MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) throw err;
        const db = client.db(dbName);
        console.log('Database initialized:', dbName);
    });
}

function launchPythonBackend() {
    const pythonProcess = spawn('python', ['path/to/your/backend.py']);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`Backend output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Backend error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Backend process exited with code: ${code}`);
    });
}

// IPC Handlers
ipcMain.on('some-event', (event, arg) => {
    console.log(arg); // Logs the argument received
    event.reply('some-reply', 'Response from main process');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
