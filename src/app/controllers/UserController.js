import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string()
                .required()
                .min(6)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'There is something wrong' });
        }

        const userExists = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // const { id, name, email } = await User.create(req.body);
        const user = await User.create(req.body);

        // return res.json({ id, name, email });
        return res.json(user);
    }

    async update(req, res) {
        return res.send('ok');
    }
}

export default new UserController();
