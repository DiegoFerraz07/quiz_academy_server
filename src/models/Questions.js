import Sequelize, { Model } from 'sequelize';

export default class Questions extends Model {
  static init(sequelize) {
    super.init(
      {
        statement: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'O enunciado da questão precisa ter entre 10 a 255 caracters',
            },
          },
        },
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Games, { foreignKey: 'games_id', as: 'games' });
    this.hasMany(models.Choices, { foreignKey: 'questions_id' });
  }
}
