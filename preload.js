const { contextBridge, ipcRenderer } = require('electron');

// Expose secure IPC methods to the renderer process
contextBridge.exposeInMainWorld('api', {
    fetchData: (channel) => {
        // Whitelist channels
        const validChannels = ['data-fetch'];
        if (validChannels.includes(channel)) {
            return ipcRenderer.invoke(channel);
        }
    },
    controlWindow: (action) => {
        const validActions = ['minimize', 'maximize', 'close'];
        if (validActions.includes(action)) {
            ipcRenderer.send('window-control', action);
        }
    },
    onEvent: (channel, func) => {
        const validChannels = ['event-name'];
        if (validChannels.includes(channel)) {
            // Strip event name and use it as a subscription
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
});