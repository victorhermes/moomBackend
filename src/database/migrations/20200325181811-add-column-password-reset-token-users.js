module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('users', 'password_reset_token', {
            type: Sequelize.STRING,
            unique: true,
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('users', 'password_reset_token');
    },
};
