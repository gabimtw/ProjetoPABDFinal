const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

// --- CONFIGURAÇÕES ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Simple flash-like messages via query params (success, error)
app.use((req, res, next) => {
    res.locals.success = req.query.success;
    res.locals.error = req.query.error;
    next();
});

// --- CONEXÃO COM O BANCO ---
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'tbsagsuperherois'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err);
        return;
    }
    console.log('Banco de Dados conectado com sucesso!');
});

// --- 1. DASHBOARD ---
app.get('/', (req, res) => {
    res.render('index'); 
});

// --- 2. MÓDULO: HERÓIS (tbheroi) ---
app.get('/herois', (req, res) => {
    const sql = "SELECT * FROM tbheroi"; 
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send("Erro ao buscar heróis.");
        res.render('herois', { herois: results });
    });
});

app.post('/herois/cadastrar', (req, res) => {
    const { nome, codinome, identidade, status } = req.body;
    if (!nome || !codinome) return res.redirect('/herois?error=' + encodeURIComponent('Nome e Codinome são obrigatórios.'));
    const sql = "INSERT INTO tbheroi (Nome, Codinome, IdentidadeSecreta, StatusAtividade) VALUES (?, ?, ?, ?)";
    db.query(sql, [nome, codinome, identidade, status], (err) => {
        if (err) return res.redirect('/herois?error=' + encodeURIComponent('Erro ao cadastrar herói.'));
        res.redirect('/herois?success=' + encodeURIComponent('Herói cadastrado com sucesso.'));
    });
});

app.get('/herois/deletar/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM tbheroi WHERE IdHeroi = ?";
    db.query(sql, [id], (err) => {
        if (err) return res.redirect('/herois?error=' + encodeURIComponent('Erro ao deletar herói.'));
        res.redirect('/herois?success=' + encodeURIComponent('Herói removido.'));
    });
});

// --- ROTAS DE EDIÇÃO: HERÓIS ---
app.get('/herois/editar/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM tbheroi WHERE IdHeroi = ?', [id], (err, results) => {
        if (err) return res.status(500).send('Erro ao buscar herói.');
        res.render('editar_heroi', { heroi: results[0] });
    });
});

app.post('/herois/editar/:id', (req, res) => {
    const id = req.params.id;
    const { nome, codinome, identidade, status } = req.body;
    if (!nome || !codinome) return res.redirect(`/herois/editar/${id}?error=` + encodeURIComponent('Nome e Codinome são obrigatórios.'));
    const sql = "UPDATE tbheroi SET Nome = ?, Codinome = ?, IdentidadeSecreta = ?, StatusAtividade = ? WHERE IdHeroi = ?";
    db.query(sql, [nome, codinome, identidade, status, id], (err) => {
        if (err) return res.redirect(`/herois/editar/${id}?error=` + encodeURIComponent('Erro ao atualizar herói.'));
        res.redirect('/herois?success=' + encodeURIComponent('Herói atualizado.'));
    });
});

// --- 3. MÓDULO: VILÕES (tbvilao) ---
app.get('/viloes', (req, res) => {
    const sql = "SELECT * FROM tbvilao";
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('viloes', { viloes: results });
    });
});

app.post('/viloes/cadastrar', (req, res) => {
    const { nome, afiliacao, perigo } = req.body;
    if (!nome) return res.redirect('/viloes?error=' + encodeURIComponent('Nome do vilão é obrigatório.'));
    const sql = "INSERT INTO tbvilao (NomeVilao, Afiliacao, NivelPerigo) VALUES (?, ?, ?)";
    db.query(sql, [nome, afiliacao, perigo], (err) => {
        if (err) return res.redirect('/viloes?error=' + encodeURIComponent('Erro ao cadastrar vilão.'));
        res.redirect('/viloes?success=' + encodeURIComponent('Vilão cadastrado com sucesso.'));
    });
});

app.get('/viloes/deletar/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM tbvilao WHERE IdVilao = ?";
    db.query(sql, [id], (err) => {
        if (err) return res.redirect('/viloes?error=' + encodeURIComponent('Erro ao excluir vilão. Verifique missões!'));
        res.redirect('/viloes?success=' + encodeURIComponent('Vilão removido.'));
    });
});

// --- ROTAS DE EDIÇÃO: VILÕES ---
app.get('/viloes/editar/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM tbvilao WHERE IdVilao = ?', [id], (err, results) => {
        if (err) return res.status(500).send('Erro ao buscar vilão.');
        res.render('editar_vilao', { vilao: results[0] });
    });
});

app.post('/viloes/editar/:id', (req, res) => {
    const id = req.params.id;
    const { nome, afiliacao, perigo } = req.body;
    if (!nome) return res.redirect(`/viloes/editar/${id}?error=` + encodeURIComponent('Nome é obrigatório.'));
    const sql = "UPDATE tbvilao SET NomeVilao = ?, Afiliacao = ?, NivelPerigo = ? WHERE IdVilao = ?";
    db.query(sql, [nome, afiliacao, perigo, id], (err) => {
        if (err) return res.redirect(`/viloes/editar/${id}?error=` + encodeURIComponent('Erro ao atualizar vilão.'));
        res.redirect('/viloes?success=' + encodeURIComponent('Vilão atualizado.'));
    });
});

// --- 4. MÓDULO: PODERES (tbpoder) ---
app.get('/poderes', (req, res) => {
    const sql = "SELECT * FROM tbpoder";
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('poderes', { poderes: results });
    });
});
 
 app.post('/poderes/deletar/:id', (req, res) => {
     const id = req.params.id;
     const sql = "DELETE FROM tbpoder WHERE IdPoder = ?";
     db.query(sql, [id], (err) => {
         if (err) return res.redirect('/poderes?error=' + encodeURIComponent('Poder em uso por herói!'));
         res.redirect('/poderes?success=' + encodeURIComponent('Poder removido.'));
     });
 });

app.post('/poderes/cadastrar', (req, res) => {
    const { nome, descricao } = req.body;
    if (!nome) return res.redirect('/poderes?error=' + encodeURIComponent('Nome do poder é obrigatório.'));
    const sql = "INSERT INTO tbpoder (NomePoder, Descricao) VALUES (?, ?)";
    db.query(sql, [nome, descricao], (err) => {
        if (err) return res.redirect('/poderes?error=' + encodeURIComponent('Erro ao cadastrar poder.'));
        res.redirect('/poderes?success=' + encodeURIComponent('Poder cadastrado com sucesso.'));
    });
});

app.get('/poderes/deletar/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM tbpoder WHERE IdPoder = ?";
    db.query(sql, [id], (err) => {
        if (err) return res.redirect('/poderes?error=' + encodeURIComponent('Poder em uso por herói!'));
        res.redirect('/poderes?success=' + encodeURIComponent('Poder removido.'));
    });
});

// --- 5. MÓDULO: MISSÕES (tbmissao) ---
app.get('/missoes', (req, res) => {
    const sql = "SELECT * FROM tbmissao";
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('missoes', { missoes: results });
    });
});

app.post('/missoes/cadastrar', (req, res) => {
    const { nome, data, nivel, local } = req.body;
    if (!nome || !local) return res.redirect('/missoes?error=' + encodeURIComponent('Nome da missão e Local são obrigatórios.'));
    const sql = "INSERT INTO tbmissao (NomeMissao, DataSolicitacao, NivelAmeaca, Localizacao) VALUES (?, ?, ?, ?)";
    db.query(sql, [nome, data, nivel, local], (err) => {
        if (err) return res.redirect('/missoes?error=' + encodeURIComponent('Erro ao cadastrar missão.'));
        res.redirect('/missoes?success=' + encodeURIComponent('Missão cadastrada com sucesso.'));
    });
});

app.get('/missoes/deletar/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM tbmissao WHERE IdMissao = ?";
    db.query(sql, [id], (err) => {
        if (err) return res.redirect('/missoes?error=' + encodeURIComponent('Erro ao deletar missão.'));
        res.redirect('/missoes?success=' + encodeURIComponent('Missão removida.'));
    });
});

// --- ROTAS DE EDIÇÃO: MISSÕES ---
app.get('/missoes/editar/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM tbmissao WHERE IdMissao = ?', [id], (err, results) => {
        if (err) return res.status(500).send('Erro ao buscar missão.');
        res.render('editar_missao', { missao: results[0] });
    });
});

app.post('/missoes/editar/:id', (req, res) => {
    const id = req.params.id;
    const { nome, data, nivel, local } = req.body;
    const sql = "UPDATE tbmissao SET NomeMissao = ?, DataSolicitacao = ?, NivelAmeaca = ?, Localizacao = ? WHERE IdMissao = ?";
    db.query(sql, [nome, data || null, nivel, local, id], (err) => {
        if (err) return res.status(500).send('Erro ao atualizar missão.');
        res.redirect('/missoes');
    });
});

// --- 6. VÍNCULO HERÓI + PODER (tbheroipoder) ---
app.get('/herois/poderes', (req, res) => {
    const sqlHerois = "SELECT IdHeroi, Codinome FROM tbheroi";
    const sqlPoderes = "SELECT IdPoder, NomePoder FROM tbpoder";
    const sqlVinculos = `
        SELECT h.Codinome, p.NomePoder, hp.NivelDominio, hp.IdHeroi, hp.IdPoder 
        FROM tbheroipoder hp
        JOIN tbheroi h ON h.IdHeroi = hp.IdHeroi
        JOIN tbpoder p ON p.IdPoder = hp.IdPoder`;

    db.query(sqlHerois, (err, herois) => {
        db.query(sqlPoderes, (err, poderes) => {
            db.query(sqlVinculos, (err, vinculos) => {
                res.render('vincular_poder', { herois, poderes, vinculos });
            });
        });
    });
});

app.post('/herois/poderes/vincular', (req, res) => {
    const { idHeroi, idPoder, nivel } = req.body;
    const sql = "INSERT INTO tbheroipoder (IdHeroi, IdPoder, NivelDominio) VALUES (?, ?, ?)";
    db.query(sql, [idHeroi, idPoder, nivel], (err) => {
        if (err) return res.status(500).send("Herói já possui este poder.");
        res.redirect('/herois/poderes');
    });
});

// --- 7. GERENCIAR OPERAÇÃO (Escalar Equipe e Vilões) ---
app.get('/missoes/gerenciar/:id', (req, res) => {
    const idMissao = req.params.id;
    const sqlMissao = "SELECT * FROM tbmissao WHERE IdMissao = ?";
    const sqlHerois = "SELECT IdHeroi, Codinome FROM tbheroi";
    const sqlViloes = "SELECT IdVilao, NomeVilao FROM tbvilao";
    const sqlEquipe = "SELECT h.Codinome FROM tbequipemissao em JOIN tbheroi h ON em.IdHeroi = h.IdHeroi WHERE em.IdMissao = ?";
    const sqlAlvos = "SELECT v.NomeVilao FROM tbameacamissao am JOIN tbvilao v ON am.IdVilao = v.IdVilao WHERE am.IdMissao = ?";

    db.query(sqlMissao, [idMissao], (err, m) => {
        db.query(sqlHerois, (err, h) => {
            db.query(sqlViloes, (err, v) => {
                db.query(sqlEquipe, [idMissao], (err, eq) => {
                    db.query(sqlAlvos, [idMissao], (err, al) => {
                        res.render('detalhes_missao', { missao: m[0], herois: h, viloes: v, equipe: eq, alvos: al });
                    });
                });
            });
        });
    });
});

app.post('/missoes/escalar-heroi', (req, res) => {
    const { idMissao, idHeroi } = req.body;
    db.query("INSERT INTO tbequipemissao (IdMissao, IdHeroi) VALUES (?, ?)", [idMissao, idHeroi], () => {
        res.redirect(`/missoes/gerenciar/${idMissao}`);
    });
});

app.post('/missoes/designar-vilao', (req, res) => {
    const { idMissao, idVilao } = req.body;
    db.query("INSERT INTO tbameacamissao (IdMissao, IdVilao) VALUES (?, ?)", [idMissao, idVilao], () => {
        res.redirect(`/missoes/gerenciar/${idMissao}`);
    });
});

// --- PORTA ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`AEGIS System rodando em http://localhost:${PORT}`);
});