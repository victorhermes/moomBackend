import UserTeam from '../models/UserTeam';
import Role from '../models/Role';

const can = (roles) => {
    return async (req, res, next) => {
        if (roles === undefined) {
            return next();
        }

        const user = await UserTeam.findOne({
            where: { id: req.userId },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: Role,
                    as: 'roles',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'description'],
                    },
                    through: { attributes: [] },
                },
            ],
        });

        const userRole = user.roles.map((n) => {
            return n.dataValues.slug;
        });

        const role = roles.filter((r) => {
            return r === userRole.toString();
        });

        if (userRole.toString() === role.toString()) {
            return next();
        }

        return res.status(401).json({
            error: `Você não tem permissão. Só para: ${roles}`,
        });
    };
};

module.exports = can;
