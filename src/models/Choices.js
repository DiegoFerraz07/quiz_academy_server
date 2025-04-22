import Sequelize, { Model } from 'sequelize';

export default class Choices extends Model {
  static init(sequelize) {
    super.init(
      {
        choice: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [10, 255],
              msg: 'A Escolha da questão precisa ter entre 10 a 255 caracters',
            },
          },
        },
        is_correct: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
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
    this.belongsTo(models.Questions, { foreignKey: 'questions_id' });
    this.hasMany(models.StudentAnswers, { foreignKey: 'choices_id' });
  }
}
