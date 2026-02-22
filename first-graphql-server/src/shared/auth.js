const jwt = require('jsonwebtoken');
const SECRET = 'my-secret';
const { GraphQLError } = require('graphql');

function getUserFromToken(token) {
    try {
        return jwt.verify(token, SECRET);
    } catch (err) {
        return null;
    }
}

function isAuthorized(user, allowedRoles) {
    if (!user || !allowedRoles.includes(user.role)) {
        throw new GraphQLError("Unauthorized", {
            extensions: { code: "FORBIDDEN" }
        });
    }
}

function isAuthenticated(user) {
    if (!user) {
        throw new GraphQLError("Authentication required", {
            extensions: { code: "UNAUTHENTICATED" }
        });
    }
}

module.exports = { getUserFromToken, isAuthorized, isAuthenticated };