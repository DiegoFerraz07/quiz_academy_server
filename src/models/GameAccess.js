import Sequelize, { Model } from 'sequelize';

export default class GameAccess extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Games, { foreignKey: 'games_id' });
    this.belongsTo(models.Students, { foreignKey: 'students_id' });
  }
}
