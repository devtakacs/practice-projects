const DataLoader = require('dataloader');

const locationData = {
    loc1: { id: 'loc1', city: 'New York', zip: '10001' },
    loc2: { id: 'loc2', city: 'Los Angeles', zip: '90001' },
};

function createLocationLoader() {
    return new DataLoader(async (keys) => {
        console.log('Batch loading for keys:', keys);
        return keys.map((key) => locationData[key] || null);
    });
}

module.exports = { createLocationLoader };
