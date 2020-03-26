import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class ForgotPasswordMail {
    get key() {
        return 'ForgotPasswordMail';
    }

    async handle({ data }) {
        const { name, email, password_reset_token, password_reset_date } = data;

        await Mail.sendMail({
            to: `${name} <${email}>`,
            subject: 'Recuperação de senha',
            template: 'forgot-password',
            context: {
                name,
                password_reset_token,
                date: format(
                    parseISO(password_reset_date),
                    "'dia' dd 'de' MMMM', às' H:mm'h'",
                    {
                        locale: pt,
                    }
                ),
            },
        });
    }
}

export default new ForgotPasswordMail();
