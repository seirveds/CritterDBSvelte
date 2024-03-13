const STORENAME = 'caught';
const DEFAULTSTORE = {};

function initializeStore() {
    localStorage.setItem(STORENAME, JSON.stringify(DEFAULTSTORE));
};

function saveStore(obj) {
    localStorage.setItem(STORENAME, JSON.stringify(obj));
};

function loadStore() {
    let store = localStorage.getItem(STORENAME);
    if (!store) {
        initializeStore();
        store = JSON.stringify(DEFAULTSTORE);
    }
    return JSON.parse(store);
};

export function addToStore(critterName, selectedGame) {
    let store = loadStore();
    if (!(selectedGame in store)) {
        store[selectedGame] = [];
    };

    if (!(store[selectedGame].includes(critterName))) {
        store[selectedGame].push(critterName);
    };
    saveStore(store);
};

export function removeFromStore(critterName, selectedGame) {
    let store = loadStore();
    if (store[selectedGame].includes(critterName)) {
        store[selectedGame] = store[selectedGame].filter(e => e !== critterName);
        saveStore(store);
    };
};

export function critterInStore(critterName, selectedGame) {
    let store = loadStore();
    if (selectedGame in store) {
        return store[selectedGame].includes(critterName);
    }
    return false;
}

// Debug
export function logStore() {
    console.log(loadStore());
};