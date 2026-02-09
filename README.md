🦸‍♂️ Sistema de Gerenciamento de Super-Heróis
Este projeto é uma aplicação web para gerenciar heróis, vilões e missões, desenvolvida para a disciplina de Banco de Dados.

📋 Funcionalidades
Listagem Dinâmica: Exibe os heróis salvos no banco de dados MySQL.

Cadastro de Heróis: Interface para inserir novos personagens via formulário.

Interface Responsiva: Utiliza Bootstrap para se adaptar a diferentes tamanhos de tela.

🗄️ Estrutura do Banco de Dados
O projeto utiliza o banco tbsagsuperherois com as seguintes tabelas principais:

tbheroi: Dados dos heróis (Nome, Codinome, Identidade, Status).

tbpoder: Catálogo de poderes.

tbheroipoder: Relacionamento entre heróis e seus respectivos poderes.

tbmissao: Registro de missões e vilões envolvidos.

🚀 Como executar
Inicie o Apache e o MySQL no XAMPP.

No phpMyAdmin, crie o banco tbsagsuperherois e importe o arquivo SQL.

No terminal da pasta do projeto, instale as dependências:
npm install
node server.js
Acesse: http://localhost:3000

## Instruções detalhadas

1. Instalar dependências

```bash
npm install
```

2. Banco de dados

- Abra o `phpMyAdmin` ou use linha de comando MySQL e crie o banco `tbsagsuperherois`.
- Importe o arquivo `banco.sql` fornecido no repositório (Menu Importar no phpMyAdmin ou via CLI):

```bash
mysql -u root -p < banco.sql
```

3. Executar o servidor

```bash
npm start
# ou
node server.js
```

4. Acesso

Abra `http://localhost:3000` no navegador.

## Modelo relacional (resumo)

- `tbheroi` (IdHeroi PK, Nome, Codinome, IdentidadeSecreta, StatusAtividade)
- `tbvilao` (IdVilao PK, NomeVilao, Afiliacao, NivelPerigo)
- `tbpoder` (IdPoder PK, NomePoder, Descricao)
- `tbheroipoder` (IdHeroi FK -> tbheroi, IdPoder FK -> tbpoder, NivelDominio)
- `tbmissao` (IdMissao PK, NomeMissao, DataSolicitacao, NivelAmeaca, Localizacao)
- `tbequipemissao` (IdMissao FK -> tbmissao, IdHeroi FK -> tbheroi)
- `tbameacamissao` (IdMissao FK -> tbmissao, IdVilao FK -> tbvilao)

> Recomendo incluir `banco.sql` ou diagrama ER no README para documentação completa.