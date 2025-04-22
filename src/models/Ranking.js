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
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Students, { foreignKey: 'students_id' });
    this.belongsTo(models.Games, { foreignKey: 'games_id' });
  }
}
