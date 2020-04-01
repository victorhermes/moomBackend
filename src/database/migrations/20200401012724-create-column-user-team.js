module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('user_teams', 'work', {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('user_teams', 'work');
    },
};
