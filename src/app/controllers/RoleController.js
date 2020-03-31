import Role from '../models/Role';
import Permission from '../models/Permission';

class RoleController {
    async index(req, res) {
        try {
            const roles = await Role.findAll({
                include: [
                    {
                        model: Permission,
                        as: 'permissions',
                        through: { attributes: [] },
                    },
                ],
            });

            return res.json(roles);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async store(req, res) {
        try {
            const { permissions, ...data } = req.body;

            const role = await Role.create(data);

            if (permissions && permissions.length > 0) {
                await role.setPermissions(permissions);
            }

            return res.status(200).json(role);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;

            const role = await Role.findByPk(id);

            const { permissions, ...data } = req.body;

            await role.update(data);

            if (permissions && permissions.length > 0) {
                await role.setPermissions(permissions);
            }

            return res.status(200).json(role);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default new RoleController();
