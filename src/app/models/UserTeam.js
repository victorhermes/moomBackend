import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class UserTeam extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                change_password_next_login: Sequelize.BOOLEAN,
                password_reset_token: Sequelize.STRING,
                password_reset_date: Sequelize.DATE,
            },
            {
                sequelize,
            }
        );

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.Role, {
            foreignKey: 'user_id',
            through: 'role_user_team',
            as: 'roles',
        });

        this.belongsToMany(models.Permission, {
            foreignKey: 'user_id',
            through: 'permission_user_team',
            as: 'permissions',
        });
    }

    checkPassoword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default UserTeam;
