// ./controllers/userController.js

const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: 'Email não encontrado' });
  }
  const token = crypto.randomBytes(20).toString('hex');
  await user.update({ resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 }); // 1 hora

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'seu_email@gmail.com',
      pass: 'sua_senha'
    }
  });

  const mailOptions = {
    to: user.email,
    from: 'passwordreset@demo.com',
    subject: 'Recuperação de Senha',
    text: `Você está recebendo isso porque você (ou alguém) solicitou a redefinição da senha para sua conta.\n\n` +
      `Por favor, clique no link a seguir ou cole no seu navegador para concluir o processo:\n\n` +
      `http://localhost:3000/reset/${token}\n\n` +
      `Se você não solicitou isso, por favor ignore este email e sua senha permanecerá a mesma.\n`
  };

  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao enviar email' });
    }
    res.status(200).json({ message: 'Email de recuperação enviado com sucesso' });
  });
};

exports.resetPassword = async (req, res) => {
  const user = await User.findOne({
    where: {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { [Op.gt]: Date.now() }
    }
  });
  if (!user) {
    return res.status(400).json({ error: 'Token inválido ou expirado' });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await user.update({ password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null });
  res.status(200).json({ message: 'Senha redefinida com sucesso' });
};

// Criar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

class UserController{
    constructor(UserService){
        this.userService = UserService;
    }
    async createUser(req,res){
        //processar a request
        const {email, data_nasc, password} = req.body;
        try{
            const newUser = await this.userService.create(email, data_nasc, password);
            res.status(200).json(newUser);
            res.send();
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao gravar o novo usuário.'});
        }
    }

    async findAllUsers(req,res){
        try{
            const AllUsers = await this.userService.findAll();
            res.status(200).json(AllUsers);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao localizar todos os usuários.'});
        }
    }

    async findUserById(req,res){
        const {id} = req.query;
        try{
            const User = await this.userService.findById(id);
            res.status(200).json(User);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao localizar os usuário pelo ID.'});
        }

    }

    //Método para login
    async login(req,res){
        const {email, password} = req.body;
        try{
            const User  = await this.userService.login(email, password);
            //Atenção! Vai ter um problema de segurança
            res.status(200).json(User);
        }
        catch(error){
            res.status(500).json({error: 'Erro ao logar o usuário'});
        }
    }
}

module.exports = UserController;