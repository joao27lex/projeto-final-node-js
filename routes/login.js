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
      _foto: '',
      _carta: ''
    };
    
    bd.one('SELECT id, name, email, password_hash, avatar_path, carta FROM usuarios WHERE email = $1',[req.body.txtemail]).then(async (vdados) => {
      let pwdchecked = await criptografia.compararSenhas(req.body.txtsenha, vdados.password_hash);
      
      if(pwdchecked){
        vusuario._nome = vdados.name;
        vusuario._email = vdados.email;
        vusuario._foto = vdados.avatar_path;
        vusuario._carta = vdados.carta;
        
        res.render('carta',{title: `Usuário ${vdados.name}`, dados: vusuario});
      }

      else{
        throw new Error('Senha incorreta.');
      }
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
