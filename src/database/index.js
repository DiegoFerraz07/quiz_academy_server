import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Teachers from '../models/Teachers';
import Students from '../models/Students';
import GameAccess from '../models/GameAccess';
import Games from '../models/Games';
import Questions from '../models/Questions';
import Choices from '../models/Choices';
import StudentAnswers from '../models/StudentAnswers';
import Ranking from '../models/Ranking';

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
