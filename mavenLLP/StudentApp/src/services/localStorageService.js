const localStorageService = {
    // Save an item to localStorage
    setItem : (key, value) => {
        try{
            const jsonData = JSON.stringify(value);
            localStorage.setItem(key,jsonData);
        }
        catch(err)
        {
            console.error(`Error saving ${key} to localStorage : `,err);
        }
    },

    // Retrieve an item from localStorage.
    getItem : (key) => {
        try{
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : [];
        }
        catch(err)
        {
            console.error(`Error reading ${key} from localStorage : `,err);
        }
    },

    // Remove a specific item from localStorage.
    removeItem : (key) => {
        try{
            localStorage.removeItem(key);
        }
        catch(err)
        {
            console.error(`Error removing ${key} from localStorage : `,err);
        }
    },

    // Clear all items from localStorage.
    clearAll : () => {
        try
        {
            localStorage.clear();
        }
        catch(err)
        {
            console.error(`Error clearing localStorage : `,err);
        }
    }
}

export default localStorageService;