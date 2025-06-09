import Ranking from '../models/Ranking';
import StudentAnswers from '../models/StudentAnswers';

class RankingController {
  async index(req, res) {
    try {
      const ranking = await Ranking.findAll({
        attributes: ['score'],
        include: [
          { association: 'students', attributes: ['id', 'name', 'lastName'] },
          { association: 'games', attributes: ['id', 'title'] },
        ],
        order: [['score', 'DESC']],
      });

      return res.json(ranking);
    } catch (err) {
      console.error(err);
      return res.status(401).json({ err: 'Erro ao buscar o Ranking' });
    }
  }

  async show(req, res) {
    try {
      const { gamesId } = req.params;

      if (!gamesId) {
        return res.status(401).json({
          errors: ['id não encontrado'],
        });
      }

      const ranking = await Ranking.findAll({
        where: { games_id: gamesId },
        include: [
          { association: 'students', attributes: ['id', 'name', 'lastName'] },
          { association: 'games', attributes: ['id', 'title'] },
        ],
      });
      console.log('ranking:', ranking);

      if (ranking.length === 0) {
        return res.status(404).json({
          errors: ['Nenhuma ranking encontrado.'],
        });
      }
      return res.json(ranking);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err: 'Erro ao buscar o ranking' });
    }
  }

  async store(req, res) {
    try {
      const { gamesId, studentId } = req.body;

      if (!gamesId) {
        return res.status(400).json({
          errors: ['id do jogo não encontrado'],
        });
      }

      if (!studentId) {
        return res.status(400).json({
          errors: ['id do estudante não encontrado'],
        });
      }

      const correctScore = await StudentAnswers.count({
        where: { students_id: studentId, is_correct: true },
        include: {
          association: 'questions',
          where: { games_id: gamesId },
          attributes: [],
        },
      });

      const score = correctScore;

      const ranking = await Ranking.create({
        students_id: studentId,
        games_id: gamesId,
        score: score,
      });
      return res.json(ranking);
    } catch (e) {
      console.error('Erro no index:', e.message, e.stack);
      return res.status(400).json({
        e: e,
      });
    }
  }

  async delete(req, res) {
    try {
      if (req.userRole !== 'Professor') {
        return res.status(403).json({
          errors: ['Somente professores podem excluir Jogos'],
        });
      }

      const { id } = await req.params;

      if (!id) {
        return res.status(401).json({
          errors: ['id não encontrado'],
        });
      }

      const ranking = await Ranking.findByPk(id);

      if (!ranking) {
        return res.status(401).json({
          errors: ['Ranking não existe'],
        });
      }

      await ranking.destroy();

      return res.json({
        deletado: true,
      });
    } catch (err) {
      return res.status(401).json({
        errors: err.errors.map(err => err.message),
      });
    }
  }
}

export default new RankingController();
