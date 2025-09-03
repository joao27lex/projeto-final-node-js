var express = require('express');
var router = express.Router();

const multer = require('multer');
const criptografia = require('../criptografia');
const bd = require('../conexao_bd');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cadastro', { title: 'Cadastro de Usuário' });
});

// configuração do multer para salvar arquivos no disco:
// - destination: define a pasta de destino ('public/images')
// - filename: mantém o nome original do arquivo ao salvar
const cfgStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    },
    });

const upload = multer({ storage: cfgStorage });

router.post('/', upload.single('foto'), async function(req, res, next) {
    try{
        let vnome = req.body.txtnome;
        let vemail = req.body.txtemail;
        let vsenha = req.body.txtsenha;
        let vcaminho = req.file.originalname;
        let vcarta = req.body.mensagem;

        let vsenhasecreta = await criptografia.senhaHash(vsenha);

        bd.none('INSERT INTO usuarios (name, email, password_hash, avatar_path, carta) VALUES ($1, $2, $3, $4, $5)', [vnome, vemail, vsenhasecreta, vcaminho, vcarta])
        .then(() => {
            res.render('login', { title: 'Login', mensagem: 'Usuário cadastrado com sucesso!' });
        })

        .catch(erro => {
            res.render('login', { title: 'Login', erro: 'Ocorreu um erro ao cadastrar os dados. ' + erro.message });
        });
    } catch(erro){
        console.log(erro.name);
        console.log(erro.message);

        res.render('login', { title: 'Login', erro: 'Houve um erro ao cadastrar os dados.' });
    }
});

module.exports = router;
