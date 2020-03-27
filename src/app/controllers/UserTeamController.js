import * as Yup from 'yup';
import UserTeam from '../models/UserTeam';

class UserTeamController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
            change_password_next_login: Yup.boolean().required(),
        });

        try {
            if (!(await schema.isValid(req.body))) {
                return res
                    .status(400)
                    .json({ error: 'There is something wrong' });
            }

            const userExists = await UserTeam.findOne({
                where: { email: req.body.email },
            });

            if (userExists) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const user = await UserTeam.create(req.body);

            return res.json(user);
        } catch (err) {
            return res.status(400).json({ error: 'There is something wrong' });
        }
    }
}

export default new UserTeamController();
