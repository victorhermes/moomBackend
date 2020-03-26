import * as Yup from 'yup';
import crypto from 'crypto';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';
import User from '../models/User';

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
                return res.status(404).send({ error: 'User not found' });
            }

            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();

            now.setHours(now.getHours() + 1);

            await user.update({
                password_reset_token: token,
                password_reset_date: now,
            });

            Mail.sendMail({
                to: `${user.name} <${email}>`,
                subject: 'Recuperação de senha',
                template: 'forgot-password',
                context: {
                    name: user.name,
                    token,
                },
            });
        } catch (err) {
            return res.status(404).send({ error: 'Error on forgot password' });
        }
    }
}

export default new ForgotPasswordController();
