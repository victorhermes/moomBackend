module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('permission_role', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            permission_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'permissions', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            role_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'roles', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('permission_role');
    },
};
