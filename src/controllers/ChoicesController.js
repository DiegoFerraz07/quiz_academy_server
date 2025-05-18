import Choices from '../models/Choices';

class ChoicesController {
  async index(req, res) {
    try {
      const choices = await Choices.findAll({
        include: [
          { association: 'questions', attributes: ['id', 'statement'] },
        ],
      });

      return res.json(choices);
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        errors: err.errors.map(erro => erro.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { questionsId } = req.params;

      if (!questionsId) {
        return res.status(400).json({
          errors: ['ID não encontrado'],
        });
      }

      const choices = await Choices.findAll({
        where: { questions_id: questionsId },
      });

      if (choices.length === 0) {
        return res.status(404).json({
          errors: ['Nenhuma escolha encontrada'],
        });
      }

      return res.json(choices);
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        errors: err.errors.map(erro => erro.message),
      });
    }
  }

  async store(req, res) {
    try {
      if (req.userRole !== 'Professor') {
        return res.status(403).json({
          errors: ['Somente professores podem criar questões'],
        });
      }

      const { questionsId } = req.params;

      if (!questionsId) {
        return res.status(400).json({
          errors: ['ID da questão não encontrado'],
        });
      }

      const choicesCount = await Choices.count({
        where: { questions_id: questionsId },
      });

      if (choicesCount >= 5) {
        return res.status(400).json({
          errors: ['Você só pode criar até 5 escolhas para cada questão'],
        });
      }

      //todo: verificar se tem 5 e se tem pelo menos uma correta

      const choicesData = {
        ...req.body,
        questions_id: questionsId,
      };

      const newChoice = await Choices.create(choicesData);

      return res.json(newChoice);
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        errors: err.errors.map(erro => erro.message),
      });
    }
  }

  async update(req, res) {
    try {
      if (req.userRole !== 'Professor') {
        return res.status(403).json({
          errors: ['Somente professores podem atualizar questões'],
        });
      }

      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID não encontrado'],
        });
      }

      const choice = await Choices.findByPk(id);

      if (!choice) {
        return res.status(404).json({
          errors: ['Escolha não encontrada'],
        });
      }

      const updatedChoice = await choice.update(req.body);

      return res.json(updatedChoice);
    } catch (err) {
      console.error('Erro ao atualizar escolha:', err.message, err.stack);
      return res.status(500).json({
        err: 'Erro ao atualizar a escolha',
      });
    }
  }

  async delete(req, res) {
    try {
      if (req.userRole !== 'Professor') {
        return res.status(403).json({
          errors: ['Somente professores podem deletar escolhas'],
        });
      }

      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID não encontrado'],
        });
      }

      const choice = await Choices.findByPk(id);

      if (!choice) {
        return res.status(404).json({
          errors: ['Escolha não encontrada'],
        });
      }

      await choice.destroy();

      return res.json({
        message: 'Escolha deletada com sucesso',
      });
    } catch (err) {
      console.error('Erro ao deletar escolha:', err.message, err.stack);
      return res.status(500).json({
        err: 'Erro ao deletar a escolha',
      });
    }
  }
}

export default new ChoicesController();
