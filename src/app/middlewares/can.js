import UserTeam from '../models/UserTeam';
import Permission from '../models/Permission';

class Protect {
    async can(req, res, next, permissions) {
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
    }
}

module.exports = Protect;
