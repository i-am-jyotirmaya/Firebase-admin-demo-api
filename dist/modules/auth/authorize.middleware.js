"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorize = (adminRequired) => {
    return (req, res, next) => {
        const { admin } = res.locals;
        if (admin || !adminRequired) {
            return next();
        }
        if (adminRequired && !admin) {
            return res.status(403).json({ message: 'You don\'t have administrator priviledges!' });
        }
    };
};
exports.authorize = authorize;
//# sourceMappingURL=authorize.middleware.js.map