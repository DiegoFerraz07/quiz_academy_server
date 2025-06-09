import Choices from '../models/Choices';
import Questions from '../models/Questions';

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
      const { choices } = req.body;

      if (!questionsId) {
        return res.status(400).json({
          errors: ['ID da questão não encontrado'],
        });
      }

      if (!Array.isArray(choices) || choices.length !== 5) {
        return res.status(400).json({
          errors: ['Você deve enviar exatamente 5 escolhas'],
        });
      }

      const existingChoicesCount = await Choices.count({
        where: { questions_id: questionsId },
      });

      if (existingChoicesCount + choices.length !== 5) {
        return res.status(400).json({
          errors: ['Você deve ter exatamente 5 escolhas por questão.'],
        });
      }

      const correctChoicesCount = choices.filter(
        c => c.is_correct === true,
      ).length;

      if (correctChoicesCount !== 1) {
        return res.status(400).json({
          errors: ['Deve haver exatamente UMA escolha correta'],
        });
      }

      const newChoices = await Promise.all(
        choices.map(choice => {
          return Choices.create({
            ...choice,
            questions_id: questionsId,
          });
        }),
      );

      return res.status(201).json(newChoices);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        errors: err.errors
          ? err.errors.map(e => e.message)
          : ['Erro interno no servidor'],
      });
    }
  }

  async update(req, res) {
    try {
      if (req.userRole !== 'Professor') {
        return res.status(403).json({
          errors: ['Somente professores podem criar questões'],
        });
      }

      const { questionsId } = req.params;
      const { choices } = req.body;

      if (!questionsId) {
        return res.status(400).json({
          errors: ['ID da questão não encontrado'],
        });
      }

      if (!Array.isArray(choices) || choices.length !== 5) {
        return res.status(400).json({
          errors: ['Você deve enviar exatamente 5 escolhas'],
        });
      }

      const correctChoicesCount = choices.filter(
        c => c.is_correct === true,
      ).length;

      if (correctChoicesCount !== 1) {
        return res.status(400).json({
          errors: ['Deve haver exatamente UMA escolha correta'],
        });
      }

      // Atualiza cada choice — **exige informar where no update!**
      await Promise.all(
        choices.map(choice => {
          return Choices.update(
            {
              choice: choice.choice,
              is_correct: choice.is_correct,
              question_id: questionsId, // corrigido para singular question_id
            },
            {
              where: { id: choice.id, questions_id: questionsId },
            },
          );
        }),
      );

      return res
        .status(200)
        .json({ message: 'Choices atualizadas com sucesso' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        errors: err.errors
          ? err.errors.map(e => e.message)
          : ['Erro interno no servidor'],
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
