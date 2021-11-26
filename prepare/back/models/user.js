const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        temperature: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        score: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 100,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associations(db) {}
};
