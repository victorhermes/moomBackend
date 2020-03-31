import Sequelize, { Model } from 'sequelize';

class Role extends Model {
    static init(sequelize) {
        super.init(
            {
                slug: Sequelize.STRING,
                name: Sequelize.STRING,
                description: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.Permission, {
            foreignKey: 'role_id',
            through: 'permission_role',
            as: 'permissions',
        });
    }
}

export default Role;
