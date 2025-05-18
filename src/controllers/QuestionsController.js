import Questions from '../models/Questions';

class QuestionsController {
  async index(req, res) {
    try {
      const questions = await Questions.findAll({
        include: [{ association: 'games', attributes: ['id', 'title'] }],
      });
      console.log('questions:', questions);

      return res.json(questions);
    } catch (err) {
      console.error(err);
      return res.status(401).json({ err: 'Erro ao buscar as questões' });
    }
  }

  async show(req, res) {
    try {
      const { gamesId } = await req.params;

      if (!gamesId) {
        return res.status(401).json({
          errors: ['id não encontrado'],
        });
      }

      const questions = await Questions.findAll({
        where: { games_id: gamesId },
      });
      console.log('questions:', questions);

      if (questions.length === 0) {
        return res.status(404).json({
          errors: ['Nenhuma questão encontrada para este jogo.'],
        });
      }
      return res.json(questions);
    } catch (err) {
      console.error(err);
      return res.status(401).json({ err: 'Erro ao buscar as Questões' });
    }
  }

  async store(req, res) {
    try {
      if (req.userRole !== 'Professor') {
        return res.status(403).json({
          errors: ['Somente professores podem criar Questões'],
        });
      }

      const { gamesId } = await req.params;

      if (!gamesId) {
        return res.status(401).json({
          errors: ['id não encontrado'],
        });
      }

      const questionsCount = await Questions.count({
        where: { games_id: gamesId },
      });

      if (questionsCount >= 10) {
        return res.status(401).json({
          errors: ['Você so pode criar apena 10 questões por jogo'],
        });
      }

      const questionsData = {
        ...req.body,
        games_id: gamesId,
      };
      const newQuestion = await Questions.create(questionsData);
      return res.json(newQuestion);
    } catch (e) {
      console.error('Erro no index:', e.message, e.stack);
      return res.status(400).json({
        e: e,
      });
    }
  }

  async update(req, res) {
    try {
      if (req.userRole !== 'Professor') {
        return res.status(403).json({
          errors: ['Somente professores podem atualizar Jogos'],
        });
      }

      const { id } = req.params;

      if (!id) {
        return res.status(401).json({
          errors: ['id não encontrado'],
        });
      }

      const questions = await Questions.findByPk(id);

      if (!questions) {
        return res.status(401).json({
          errors: ['Jogo não existe'],
        });
      }

      const questionsAtualizado = await questions.update(req.body);

      return res.json(questionsAtualizado);
    } catch (err) {
      return res.status(401).json({
        errors: err.errors.map(err => err.message),
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

      const questions = await Questions.findByPk(id);

      if (!questions) {
        return res.status(401).json({
          errors: ['Jogo não existe'],
        });
      }

      await questions.destroy();

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

export default new QuestionsController();
