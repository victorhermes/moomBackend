import UserTeam from '../models/UserTeam';
import Permission from '../models/Permission';
import Role from '../models/Role';

export function is(roles) {
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

        const userRole = user.roles.map((s) => {
            return s.dataValues.slug;
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
}

export function can(permissions) {
    return async (req, res, next) => {
        if (permissions === undefined) {
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
                    model: Permission,
                    as: 'permissions',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'description'],
                    },
                    through: { attributes: [] },
                },
            ],
        });

        if (!user) {
            return res.status(401).json({
                error: `Você não tem permissão. Só para: ${permissions}`,
            });
        }

        const userPermission = user.permissions.map((s) => {
            return s.dataValues.slug;
        });

        const permission = permissions.filter((r) => {
            return userPermission.includes(r);
        });

        if (permission.length > 0) {
            return next();
        }

        return res.status(401).json({
            error: `Você não tem permissão. Só para: ${permissions}`,
        });
    };
}
