// Data
const addresses = [
    { id: '1', street: '123 Main St', locationId: 'loc1' },
    { id: '2', street: '456 Elm St', locationId: 'loc2' },
    { id: '3', street: '789 Oak St', locationId: 'loc1' },
    { id: '4', street: '321 Pine St', locationId: 'loc2' },
    { id: '5', street: '654 Maple St', locationId: 'loc1' },
    { id: '6', street: '987 Cedar St', locationId: 'loc2' },
    { id: '7', street: '111 Birch St', locationId: 'loc1' },
    { id: '8', street: '222 Spruce St', locationId: 'loc2' },
    { id: '9', street: '333 Willow St', locationId: 'loc1' },
    { id: '10', street: '444 Aspen St', locationId: 'loc2' },
];

const locationData = {
    loc1: { id: 'loc1', city: 'New York', zip: '10001' },
    loc2: { id: 'loc2', city: 'Los Angeles', zip: '90001' },
};

// Resolvers
const resolvers = {
    Query: {
        addresses: () => addresses,
        searchAddresses: () => addresses,
    },
    Address: {
        locationDetails: (address) => {
            console.log('Resolving locationDetails for:', address.locationId);
            return locationData[address.locationId];
        },
        __resolveType(obj, context, info) {
            if (obj.landmark) {
                return 'HomeAddress';
            }
            if (obj.companyName) {
                return 'OfficeAddress';
            }
            return null;
        }
    },
    AddressResult: {
        __resolveType(obj, context, info) {
            if (obj.landmark) return 'HomeAddress';
            if (obj.companyName) return 'OfficeAddress';
            return null;
        }
    },
};

module.exports = resolvers;