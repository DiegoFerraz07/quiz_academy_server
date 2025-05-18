import Sequelize, { Model } from 'sequelize';

export default class StudentAnswers extends Model {
  static init(sequelize) {
    super.init(
      {
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
    this.belongsTo(models.Students, {
      foreignKey: 'students_id',
      as: 'students',
    });
    this.belongsTo(models.Questions, {
      foreignKey: 'questions_id',
      as: 'questions',
    });
    this.belongsTo(models.Choices, { foreignKey: 'choices_id', as: 'choices' });
  }
}
