const bcrypt = require('bcrypt');

async function senhaHash(senha){
    const saltRounds = 10;
    try{
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(senha, salt);
        return hash;
    }

    catch(erro){
        console.error(erro);
        throw new Error('Erro ao encriptar senha')
    }
}

async function compararSenhas(senha, senhaHashed){
    try{
        return await bcrypt.compare(senha, senhaHashed);
    }

    catch(erro){
        console.error(erro);
        throw new Error("Erro ao comparar senhas.");
    }
}

module.exports = {senhaHash, compararSenhas};