module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('roles', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            slug: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            description: {
                type: Sequelize.STRING,
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('roles');
    },
};
