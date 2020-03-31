import Permission from '../models/Permission';

class PermissionController {
    async index(req, res) {
        try {
            const permission = await Permission.findAll();

            return res.json(permission);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async store(req, res) {
        try {
            const permission = await Permission.create(req.body);

            return res.json(permission);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;

            const permission = await Permission.findByPk(id);

            await permission.update(req.body);

            return res.status(200).json(permission);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default new PermissionController();
