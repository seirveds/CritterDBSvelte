export function initializeStore(storeName, default_={}) {
    localStorage.setItem(storeName, JSON.stringify(default_));
};

export function checkIfStoreExists(storeName) {
    return localStorage.getItem(storeName) !== null
}

function saveStore(obj, storeName) {
    localStorage.setItem(storeName, JSON.stringify(obj));
};

function loadStore(storeName) {
    let store = localStorage.getItem(storeName);
    if (!store) {
        initializeStore(storeName);
        store = JSON.stringify({});
    }
    return JSON.parse(store);
};

export function updateKeyValueStore(key, value, storeName) {
    let store = loadStore(storeName);
    store[key] = value;
    saveStore(store, storeName)
}

export function getFromValueStore(key, storeName) {
    let store = loadStore(storeName);
    return store[key];
}

export function addToCaughtStore(critterName, selectedGame, storeName) {
    let store = loadStore(storeName);
    if (!(selectedGame in store)) {
        store[selectedGame] = [];
    };

    if (!(store[selectedGame].includes(critterName))) {
        store[selectedGame].push(critterName);
    };
    saveStore(store, storeName);
};

export function removeFromCaughtStore(critterName, selectedGame, storeName) {
    let store = loadStore(storeName);
    if (store[selectedGame].includes(critterName)) {
        store[selectedGame] = store[selectedGame].filter(e => e !== critterName);
        saveStore(store, storeName);
    };
};

export function critterInCaughtStore(critterName, selectedGame, storeName) {
    let store = loadStore(storeName);
    if (selectedGame in store) {
        return store[selectedGame].includes(critterName);
    }
    return false;
}

// Debug
export function logStore(storeName) {
    console.log(loadStore(storeName));
};