import Sequelize, { Model } from 'sequelize';

class Permission extends Model {
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
        this.belongsToMany(models.Role, {
            foreignKey: 'permission_id',
            through: 'permission_role',
            as: 'roles',
        });
    }
}

export default Permission;
