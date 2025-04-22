import Teachers from '../models/Teachers';

class TeacherController {
  async store(req, res) {
    try {
      const newTeacher = await Teachers.create(req.body);
      return res.json(newTeacher);
    } catch (error) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Id não encontrado'],
        });
      }

      const teacher = await Teachers.findByPk(id);

      if (!teacher) {
        return res.status(400).json({
          errors: ['Professor não encontrado'],
        });
      }

      const teacherUpdate = teacher.update(req.body);
      return res.json(teacherUpdate);
    } catch (error) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Id não encontrado'],
        });
      }

      const teacher = await Teachers.findByPk(id);

      if (!teacher) {
        return res.status(400).json({
          errors: ['Professor não encontrado'],
        });
      }

      await teacher.destroy();
      return res.json({
        msg: 'Professor deletado com sucesso!',
      });
    } catch (error) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }
}

export default new TeacherController();
