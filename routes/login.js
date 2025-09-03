const express = require('express');
const router = express.Router();
const criptografia = require('../criptografia');
const bd = require('../conexao_bd');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next){
  try {
    let vusuario = {
      _nome: '',
      _email: '',
      _foto: ''
    };
    
    bd.one('SELECT id, name, email, passwordHash, avatar_path, carta FROM usuario WHERE email = $1',[req.body.txtemail]).then(async (vdados) => {
      let pwdchecked = await criptografia.compararSenhas(req.body.txtsenha, vdados.senha);
      
      if(pwdchecked){
        vusuario._nome = vdados.name;
        vusuario._email = vdados.email;
        vusuario._foto = vdados.avatar_path;
        vusuario._carta = vdados.carta;
        
        res.render('dados-cadastro',{title: `Usuário ID ${vdados.id} =)`, dados: vusuario});
      }

      throw new Error('Erro ao consultar dados.');
    })
    
    .catch(err => {
      res.render('login', { title: 'Login', erro: err.message });
    });

    
  }
  
  catch(erro){
    res.render('login', { title: 'Login', erro: 'Houve um erro ao processar os dados.' });
  }

})

module.exports = router;
