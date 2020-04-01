import UserTeam from '../models/UserTeam';
import Role from '../models/Role';

const is = (roles) => {
    return async (req, res, next) => {
        if (roles === undefined) {
            return next();
        }

        const user = await UserTeam.findOne({
            where: {
                email: req.cookies.userEmail,
                id: req.userId,
            },
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

        if (!user) {
            return res.status(401).json({
                error: `Você não tem permissão. Só para: ${roles}`,
            });
        }

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

module.exports = is;
