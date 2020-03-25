module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('users', 'password_reset_date', {
            type: Sequelize.DATE,
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('users', 'password_reset_date');
    },
};
