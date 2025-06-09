import Games from '../models/Games';

class GamesController {
  async index(req, res) {
    try {
      const games = await Games.findAll({
        include: [
          { association: 'teachers', attributes: ['id', 'name', 'email'] },
        ],
      });
      console.log('games:', games);
      return res.json(games);
    } catch (err) {
      console.error(err);
      return res.status(401).json({ err: 'Erro ao buscar os  jogos' });
    }
  }

  async show(req, res) {
    try {
      const { gameId } = req.params;
      const game = await Games.findByPk(gameId, {
        include: [
          { association: 'teachers', attributes: ['id', 'name', 'email'] },
        ],
      });
      console.log('games:', game);
      return res.json(game);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err: 'Erro ao buscar os  jogos' });
    }
  }

  async indexTeacher(req, res) {
    try {
      if (req.userRole !== 'Professor') {
        return res.status(403).json({
          errors: ['Somente professores podem acessar seus próprios jogos'],
        });
      }
      const { teacherId } = req.params;
      const teacherGames = await Games.findAll({
        where: { teachers_id: teacherId },
        include: [
          { association: 'teachers', attributes: ['id', 'name', 'email'] },
        ],
      });
      console.log('games:', teacherGames);
      return res.json(teacherGames);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err: 'Erro ao buscar os  jogos' });
    }
  }

  async store(req, res) {
    try {
      if (req.userRole !== 'Professor') {
        return res.status(403).json({
          errors: ['Somente professores podem criar Jogos'],
        });
      }
      const gameData = {
        ...req.body,
        teachers_id: req.userId,
      };
      const newGames = await Games.create(gameData);
      return res.json(newGames);
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
        return res.status(401).json({
          errors: ['Somente professores podem atualizar Jogos'],
        });
      }

      const { gameId } = req.params;

      if (!gameId) {
        return res.status(404).json({
          errors: ['Id não encontrado'],
        });
      }
      const games = await Games.findByPk(gameId);

      if (!games) {
        return res.status(404).json({
          errors: ['Jogo não existe'],
        });
      }

      const { teachers_id } = games;

      if (teachers_id !== req.userId) {
        return res.status(401).json({
          errors: ['Você não tem permissão para realizar essa ação'],
        });
      }

      const gamesAtualizado = await games.update(req.body);

      return res.json(gamesAtualizado);
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

      const { id } = req.params;

      if (!id) {
        return res.status(401).json({
          errors: ['id não encontrado'],
        });
      }

      const games = await Games.findByPk(id);

      if (!games) {
        return res.status(401).json({
          errors: ['Jogo não existe'],
        });
      }

      await games.destroy();

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

export default new GamesController();
