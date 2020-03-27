import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });

        try {
            if (!(await schema.isValid(req.body))) {
                return res
                    .status(400)
                    .json({ error: 'There is something wrong' });
            }

            const userExists = await User.findOne({
                where: { email: req.body.email },
            });

            if (userExists) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const user = await User.create(req.body);

            return res.json(user);
        } catch (err) {
            return res.status(400).json({ error: 'There is something wrong' });
        }
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            oldPassword: Yup.string().min(6).required(),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                )
                .required(),
            confirmPassword: Yup.string()
                .when('password', (password, field) =>
                    password
                        ? field.required().oneOf([Yup.ref('password')])
                        : field
                )
                .required(),
        });

        try {
            if (!(await schema.isValid(req.body))) {
                return res
                    .status(400)
                    .json({ error: 'There is something wrong' });
            }

            const { name, email, oldPassword, password } = req.body;

            const user = await User.findByPk(req.userId);

            if (email !== user.email) {
                const userExists = await User.findOne({ where: { email } });

                if (userExists) {
                    return res
                        .status(400)
                        .json({ error: 'User already exists' });
                }
            }

            if (oldPassword && !(await user.checkPassoword(oldPassword))) {
                return res
                    .status(400)
                    .json({ error: 'Password does not match' });
            }

            if (oldPassword === password) {
                return res.status(400).json({
                    error:
                        'An old password cannot be the same as a new password',
                });
            }

            await user.update(req.body);

            const { id } = await User.findByPk(req.userId);

            return res.json({ id, name, email });
        } catch (err) {
            return res.status(400).json({ error: 'There is something wrong' });
        }
    }

    async destroy(req, res) {
        try {
            const user = await User.findByPk(req.userId);

            await user.destroy();

            return res.status(200).json({ success: 'Deleted user' });
        } catch (err) {
            return res.status(400).json({ error: 'Error deleting user' });
        }
    }
}

export default new UserController();
