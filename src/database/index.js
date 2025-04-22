import Sequelize from 'sequelize';
import databaseConfig from '../config/database.js';
import Teachers from '../models/Teachers.js';
import Students from '../models/Students.js';
import GameAccess from '../models/GameAccess.js';
import Games from '../models/Games.js';
import Questions from '../models/Questions.js';
import Choices from '../models/Choices.js';
import StudentAnswers from '../models/StudentAnswers.js';
import Ranking from '../models/Ranking.js';

const models = [
  Teachers,
  Students,
  GameAccess,
  Games,
  Questions,
  Choices,
  StudentAnswers,
  Ranking,
];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));
