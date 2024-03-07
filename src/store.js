const STORENAME = 'caught';
const DEFAULTSTORE = {};

function initializeStore() {
    localStorage.setItem(STORENAME, JSON.stringify(DEFAULTSTORE));
};

function loadStore() {
    let store = localStorage.getItem(STORENAME);
    console.log(1, store);
    if (!store) {
        initializeStore();
        store = JSON.stringify(DEFAULTSTORE)
    }
    console.log(store, typeof JSON.parse(store))
    return JSON.parse(store);
};

function saveStore(obj) {
    localStorage.setItem(STORENAME, JSON.stringify(obj));
};

export function addToStore(obj, selectedGame) {
    let store = loadStore();
    console.log(store, obj, selectedGame);
    console.log(typeof store);
    if (!(selectedGame in store)) {
        store[selectedGame] = [];
    };

    if (!(store[selectedGame].includes(obj.name))) {
        store[selectedGame].push(obj.name);
    };
    saveStore(store);
};

export function removeFromStore(obj, selectedGame) {
    let store = get(caught);
    if (store[selectedGame].includes(obj.name)) {
        store = store[selectedGame].filter(e => e !== obj.name);
        saveStore(store);
    };
};

// Debug
export function logStore() {
    console.log(loadStore());
};