require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.emit('pronto'); // Quando for conectado vai emitir um sinal "pronto".
  })
  .catch(e => console.log(e));

const session = require('express-session'); // Seções criadas para salvar um cookie no navegador do cliente para toda vez que ele logar no servidor esse cookie ser checkado.
const MongoStore = require('connect-mongo'); // Seções vão ser salvas dentro da base de dados.
const flash = require('connect-flash'); // Mensagens "Auto-Destrutivas" (Mensagens salvas em seções).
const routes = require('./routes'); // Rotas da nossa API .
const path = require('path'); // Caminhos.
const helmet = require('helmet'); // Recomendação do express.
const csrf = require('csurf'); // Tokens criados para nossos formulários para a segurança.
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware'); // Middlewares são funções executadas nas rotas.

app.use(helmet());

app.use(express.urlencoded({ extended: true })); // Pode postar formulários para dentro da API
app.use(express.json()); // Pode fazer o parse de .json para dentro da API
app.use(express.static(path.resolve(__dirname, 'public'))); // Arquivos estaticos que devem ser acessados diretamente (Imagens, textos, css, js...)

const sessionOptions = session({  // Configurações de seção
  secret: 'akasdfj0út23453456+54qt23qv',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTION }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); // Arquivos que visualizamos/renderizamos na tela (arquivos.html) 
app.set('view engine', 'ejs'); // Engine que estamos utilizando para renderizar 

app.use(csrf());

// Nossos próprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () => {  // Recebe o sinal pronto e imprime no console a URL e a Porta.
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});
