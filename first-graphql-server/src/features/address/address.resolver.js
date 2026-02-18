// Data
const addresses = [
    { id: '1', street: '123 Main St', city: 'Anytown', zip: '12345', landmark: 'Near the park' },
    { id: '2', street: '456 Office Rd', city: 'Businesstown', zip: '67890', companyName: 'Tech Corp' },
];

// Resolvers
const resolvers = {
    Query: {
        addresses: () => addresses,
        searchAddresses: () => addresses,
    },
    Address: {
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