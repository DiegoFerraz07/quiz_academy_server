import jwt from 'jsonwebtoken';
import Students from '../models/Students';
import Teachers from '../models/Teachers';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login Required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email, role } = dados;

    let user;

    if (role === 'Professor') {
      user = await Teachers.findOne({ where: { id, email } });
    } else if (role === 'Estudante') {
      user = await Students.findOne({ where: { id, email } });
    } else {
      return res.status(401).json({
        errors: [
          'É preciso enviar o tipo do usuário se é Professor ou Estudante',
        ],
      });
    }

    if (!user) {
      return res.status(401).json({
        errors: ['Usuario inválido'],
      });
    }

    req.userId = id;
    req.userEmail = email;
    req.userRole = role;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};
