const express = require('express');
const router = express.Router();
const bd = require('../conexao_bd');

router.get('/',function(req,res,next){
    let vusuario = {
        _nome: '',
        _email: '',
        _foto: '',
        _carta: '',
        _data: ''
    };
    
    bd.one('SELECT name, email, avatar_path, carta, created_at FROM tb_dados ORDER BY id DESC LIMIT 1').then((vdados) => {
        vusuario._nome = vdados.name;
        vusuario._email = vdados.email;
        vusuario._foto = vdados.avatar_path;
        vusuario._carta = vdados.carta;
        vusuario._data = vdados.created_at;

        res.render('carta',{ title: 'Visualizar dados', dados: vusuario});
    }).catch(next);
});

module.exports = router;