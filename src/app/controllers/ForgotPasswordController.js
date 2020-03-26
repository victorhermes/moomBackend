import * as Yup from 'yup';
import crypto from 'crypto';
import User from '../models/User';
import Mail from '../../lib/Mail';

class ForgotPasswordController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'There is something wrong' });
        }

        const { email } = req.body;

        try {
            const user = await User.findOne({
                where: { email },
            });

            if (!user) {
                return res.status(400).send({ error: 'User not found' });
            }

            const token = crypto.randomBytes(3).toString('hex');

            const now = new Date();

            now.setHours(now.getHours() + 1);

            user.password_reset_token = token;
            user.password_reset_date = now;

            await user.save();

            Mail.sendMail(
                {
                    to: `${user.name} <${email}>`,
                    subject: 'Recuperação de senha',
                    template: 'forgot-password',
                    context: {
                        name: user.name,
                        token,
                    },
                },
                (err) => {
                    if (err) {
                        return res
                            .status(400)
                            .send({ error: 'Unable to send email' });
                    }

                    return res.send();
                }
            );

            return res
                .status(200)
                .send({ success: 'Password recovery email was sent' });
        } catch (err) {
            return res
                .status(400)
                .send({ error: 'Error on recovery password' });
        }
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            token: Yup.string().min(6).required(),
            password: Yup.string().min(6).required(),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'There is something wrong' });
        }

        const { token, password } = req.body;

        try {
            const user = await User.findOne({
                where: { password_reset_token: token },
            });

            const now = new Date();

            if (now > user.password_reset_date) {
                return res.status(400).send({ error: 'Expired token' });
            }

            user.password_reset_token = null;
            user.password_reset_date = null;
            user.password = password;

            await user.save();

            return res
                .status(200)
                .send({ success: 'Password has been recovered' });
        } catch (err) {
            return res
                .status(400)
                .send({ error: 'Error on recovery password' });
        }
    }
}

export default new ForgotPasswordController();
