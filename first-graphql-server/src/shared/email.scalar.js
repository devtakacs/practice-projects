const { GraphQLScalarType, Kind } = require('graphql');

function validateEmail(value) {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isValid) {
        throw new TypeError(`Value is not a valid email: ${value}`);
    }
    return value;
}

const EmailScalar = new GraphQLScalarType({
    name: 'Email',
    description: 'A custom scalar type for validating email addresses',
    serialize: validateEmail,
    parseValue: validateEmail,
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return validateEmail(ast.value);
        }
        throw new TypeError(`Value is not a string: ${ast.kind}`);
    },
});

module.exports = {
    Email: EmailScalar,
    EmailTypeDef: `scalar Email`,
}