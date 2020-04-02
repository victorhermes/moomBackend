module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('permission_user_team', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'user_teams', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            permission_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'permissions', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('permission_user_team');
    },
};
