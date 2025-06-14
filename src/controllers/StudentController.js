import Students from '../models/Students';

class StudentController {
  async index(req, res) {
    try {
      const student = await Students.findAll();
      return res.json(student);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar os Alunos' });
    }
  }

  async show(req, res) {
    try {
      const { studentsId } = req.params;
      const students = await Students.findByPk(studentsId);
      return res.json(students);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err: 'Erro ao buscar os  jogos' });
    }
  }

  async store(req, res) {
    try {
      console.log(req.body);
      const newStudents = await Students.create(req.body);
      console.log(newStudents);
      return res.json(newStudents);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map(error => error.message),
      });
    }
  }
  async update(req, res) {
    try {
      const student = await Students.findByPk(req.userId);

      if (!student) {
        return res.status(400).json({
          errors: ['Estudante não encontrado'],
        });
      }

      const updateData = { ...req.body };

      if (!updateData.password || updateData.password.trim() === '') {
        delete updateData.password;
      }

      const studentUpdate = await student.update(updateData);
      return res.json(studentUpdate);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map(err => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const student = await Students.findByPk(req.userId);

      if (!student) {
        return res.status(400).json({
          errors: ['Estudante não encontrado'],
        });
      }

      await student.destroy();
      return res.json({
        msg: 'Aluno deletado com sucesso!',
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map(err => err.message),
      });
    }
  }
}

export default new StudentController();
