import Choices from '../models/Choices';
import StudentAnswers from '../models/StudentAnswers';

class StudentAnswersController {
  async index(req, res) {
    try {
      const answers = await StudentAnswers.findAll({
        attributes: ['id', 'is_correct'],
        include: [
          { association: 'students', attributes: ['id', 'name', 'lastName'] },
          { association: 'questions', attributes: ['id', 'statement'] },
          { association: 'choices', attributes: ['id', 'choice'] },
        ],
      });

      return res.json(answers);
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        errors: ['Erro a buscar as resposta'],
      });
    }
  }

  async show(req, res) {
    try {
      const { choiceId } = req.params;

      if (!choiceId) {
        return res.status(400).json({
          errors: ['ID não encontrado'],
        });
      }

      const answers = await StudentAnswers.findAll({
        where: { choices_id: choiceId },
      });

      if (answers.length === 0) {
        return res.status(404).json({
          errors: ['Nenhuma Resposta'],
        });
      }

      return res.json(answers);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err: 'Erro ao buscar as escolhas' });
    }
  }

  async store(req, res) {
    try {
      if (req.userRole !== 'Estudante') {
        return res.status(403).json({
          errors: ['Somente estudantes podem responder'],
        });
      }

      const studantId = req.userId;

      const { choiceId } = req.params;

      if (!choiceId) {
        return res.status(400).json({
          errors: ['ID da da escolha não encontrado'],
        });
      }

      const choice = await Choices.findByPk(choiceId);

      if (!choice) {
        return res.status(400).json({
          errors: ['Escolha não encontrada'],
        });
      }

      const answersCount = await StudentAnswers.count({
        where: { students_id: studantId, questions_id: choice.questions_id },
      });

      if (answersCount >= 1) {
        return res.status(400).json({
          errors: ['Você já respondeu essa questão'],
        });
      }

      const answersData = {
        ...req.body,
        choices_id: choiceId,
        students_id: studantId,
        questions_id: choice.questions_id,
        is_correct: choice.is_correct,
      };

      const newanswer = await StudentAnswers.create(answersData);

      return res.json(newanswer);
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        errors: ['Erro ao salvar a resposta'],
      });
    }
  }

  async update(req, res) {
    try {
      if (req.userRole !== 'Estudante') {
        return res.status(403).json({
          errors: ['Somente estudantes podem responder'],
        });
      }

      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID não encontrado'],
        });
      }

      const answers = await StudentAnswers.findByPk(id);

      if (!answers) {
        return res.status(404).json({
          errors: ['Escolha não encontrada'],
        });
      }

      const updatedanswers = await answers.update(req.body);

      return res.json(updatedanswers);
    } catch (err) {
      return res.status(500).json({
        err: 'Erro ao atualizar a escolha',
      });
    }
  }

  async delete(req, res) {
    try {
      if (req.userRole !== 'Professor') {
        return res.status(403).json({
          errors: ['Somente professores podem deletar as resposta'],
        });
      }

      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID não encontrado'],
        });
      }

      const answers = await StudentAnswers.findByPk(id);

      if (!answers) {
        return res.status(404).json({
          errors: ['Escolha não encontrada'],
        });
      }

      await answers.destroy();

      return res.json({
        message: 'Resposta do estudante deletada com sucesso',
      });
    } catch (err) {
      console.error('Erro ao deletar escolha:', err.message, err.stack);
      return res.status(500).json({
        err: 'Erro ao deletar a escolha',
      });
    }
  }
}

export default new StudentAnswersController();
