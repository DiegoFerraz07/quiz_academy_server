import jwt from 'jsonwebtoken';
import Students from '../models/Students';
import Teachers from '../models/Teachers';

class TokenController {
  async store(req, res) {
    const { email = '', password = '', role } = req.body;

    if (!email || !password || !role) {
      return res.status(401).json({
        errors: ['É obrigatório enviar email, password, e o tipo do usuário'],
      });
    }

    let user;

    if (role === 'Professor') {
      user = await Teachers.findOne({ where: { email } });
    } else if (role === 'Estudante') {
      user = await Students.findOne({ where: { email } });
    } else {
      return res.status(401).json({
        errors: [
          'É preciso enviar o tipo do usuário se é Professor ou Estudante',
        ],
      });
    }

    if (!user) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    if (password !== user.password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email, role }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({
      token,
      user: {
        name: user.name,
        lastName: user.lastName,
        id,
        email,
        role,
      },
    });
  }
  async show(req, res) {
    let user;
    console.log(req.userId);
    if (req.userRole === 'Professor') {
      user = await Teachers.findOne({
        where: { id: req.userId, email: req.userEmail },
      });
    } else if (req.userRole === 'Estudante') {
      user = await Students.findOne({
        where: { id: req.userId, email: req.userEmail },
      });
    }

    if (!user) {
      return res.status(401).json({
        errors: ['Usuario não encontrado'],
      });
    }

    return res.json({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: req.userRole,
    });
  }
}

export default new TokenController();
