import Sequelize, { Model } from 'sequelize';

export default class Games extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'O titulo do jogo precisa ter entre 3 a 255 caracters',
            },
          },
        },
        description: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'A Descrição precisa ter entre 3 a 255 caracters',
            },
          },
        },
        is_public: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Teachers, {
      foreignKey: 'teachers_id',
      as: 'teachers',
    });
    this.hasMany(models.Questions, { foreignKey: 'games_id' });
    this.hasMany(models.GameAccess, { foreignKey: 'games_id' });
    this.hasMany(models.Ranking, { foreignKey: 'games_id' });
  }
}
