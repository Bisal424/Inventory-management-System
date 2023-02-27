const RBAC = require('rbac');
const rolesConfig = require('./Roleconfig');

const rbac = new RBAC({
    roles: rolesConfig,
});

function checkPermission(req, res, next) {
    const role = req.user.role;
    const permission = req.method.toLowerCase();
    const resource = req.path;

    rbac
    .can(role, permission, resource)
    .then(() => {
        next();
    })
    .catch(() => {
        res.status(403).json({ message: 'Access denied' });
    });
}

module.exports = checkPermission;
