import Sequelize, { Model } from 'sequelize';

export default class Teachers extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Nome precisa ter entre 3 a 255 caracters',
            },
          },
        },
        lastName: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Sobrenome precisa ter entre 3 a 255 caracters',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'Esse e-mail jé existe',
          },
          validate: {
            isEmail: {
              msg: 'E-mail inválido',
            },
          },
        },
        password: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [6, 50],
              msg: 'A senha deve ter entre 6 a 50 caracteres',
            },
          },
        },
      },
      {
        sequelize,
        tableName: 'teachers',
      },
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Games, { foreignKey: 'teachers_id' });
  }
}
