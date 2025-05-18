import Sequelize, { Model } from 'sequelize';

export default class Ranking extends Model {
  static init(sequelize) {
    super.init(
      {
        score: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: '',
        },
      },
      {
        sequelize,
        tableName: 'ranking',
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Students, {
      foreignKey: 'students_id',
      as: 'students',
    });
    this.belongsTo(models.Games, { foreignKey: 'games_id', as: 'games' });
  }
}
