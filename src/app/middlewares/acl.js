import Role from '../models/Role';

const can = (permission) => {
    return async (req, res, next) => {
        console.log(permission);
        const role = await Role.findOne({
            where: { slug: 'visitante' },
        });

        if (role.slug !== permission) {
            return res.status(401).json({ error: 'Você não tem permissão' });
        }

        return next();
    };
};

module.exports = can;
