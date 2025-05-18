import Teachers from '../models/Teachers';

class TeacherController {
  async index(req, res) {
    try {
      const teacher = await Teachers.findAll();
      return res.json(teacher);
    } catch (err) {
      console.error(err);
      return res.status(401).json({ error: 'Erro ao buscar professores' });
    }
  }

  async store(req, res) {
    try {
      console.log(req.body);
      const newTeacher = await Teachers.create(req.body);
      console.log(newTeacher);
      return res.json(newTeacher);
    } catch (err) {
      return res.status(401).json({
        errors: err.errors.map(error => error.message),
      });
    }
  }
  async update(req, res) {
    try {
      const teacher = await Teachers.findByPk(req.userId);

      if (!teacher) {
        return res.status(401).json({
          errors: ['Professor não encontrado'],
        });
      }

      const teacherUpdate = await teacher.update(req.body);
      return res.json(teacherUpdate);
    } catch (error) {
      return res.status(401).json({
        errors: error.errors.map(err => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const teacher = await Teachers.findByPk(req.userId);

      if (!teacher) {
        return res.status(401).json({
          errors: ['Professor não encontrado'],
        });
      }

      await teacher.destroy();
      return res.json({
        msg: 'Professor deletado com sucesso!',
      });
    } catch (err) {
      return res.status(401).json({
        errors: err.errors.map(err => err.message),
      });
    }
  }
}

export default new TeacherController();
