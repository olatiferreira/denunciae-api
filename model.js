var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var core_use = require('cors');
var pg = require('pg');
var moment = require('moment');

app.use(core_use());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// JSON de configuração de conexão com banco de dados
var config = {
	user: "postgres",
	database: "denunciae",
	password: "1234",
	port: 5432,
	max: 10,
	idleTimeoutMills: 30000,
}
// cria o canal de comunicação com o banco de dados
var canal = new pg.Pool(config);

// cria rota para consulta em uma tabela do banco de dados
app.post('/addUser', function (req, res) {
	// conecta no banco a partir do canal
	canal.connect(function (erro, conexao, feito) {
		if (erro) { // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}

		var now = moment(new Date());
		var date = now.format("D/MM/YYYY-HH:mm");

		var sql = 'insert into tb_user (name, cpf, phone, password, email, user_group, active, entry_date) values (\''
			+ req.body.name + '\', \''
			+ req.body.cpf + '\', \''
			+ req.body.phone + '\',\' '
			+ req.body.password + '\',\' '
			+ req.body.email + '\',\' '
			+ 'user' + '\',\' '
			+ 'TRUE' + '\',\' '
			+ date + '\')';

		console.log(sql);

		conexao.query(sql, function (erro, resultado) {
			feito(); // libera a conexão
			if (erro) {
				return console.error('Erro na inserção dos dados', erro);
			}
			res.json(resultado.rows); // retorna ao cliente o resultado da inserção
		});
	});
});

// cria rota para consulta em uma tabela do banco de dados
app.get('/user', function (req, res) {
	// conecta no banco a partir do canal
	canal.connect(function (erro, conexao, feito) {
		if (erro) { // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'select * from tb_user';
		conexao.query(sql, function (erro, resultado) {
			feito(); // libera a conexão
			if (erro) {
				return console.error('Erro na consulta da tabela', erro);
			}
			res.json(resultado.rows); // retorna ao cliente as linhas do select
		});
	});
});

// cria rota para consulta em uma tabela do banco de dados
app.get('/user/:codigo', function (req, res) {
	// conecta no banco a partir do canal
	canal.connect(function (erro, conexao, feito) {
		if (erro) { // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'select * from tb_user where cpf =  \'' + req.params.codigo + '\'';
		console.log(sql);
		conexao.query(sql, function (erro, resultado) {
			feito(); // libera a conexão
			if (erro) {
				return console.error('Erro na remoção dos dados', erro);
			}
			res.json(resultado.rows); // retorna ao cliente o resultado da remoção
		});
	});
});

// cria rota para consulta em uma tabela do banco de dados
app.delete('/user/:codigo', function (req, res) {
	// conecta no banco a partir do canal
	canal.connect(function (erro, conexao, feito) {
		if (erro) { // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'delete from tb_user where cpf = \'' + req.params.codigo + '\'';
		conexao.query(sql, function (erro, resultado) {
			feito(); // libera a conexão
			if (erro) {
				return console.error('Erro na remoção dos dados', erro);
			}
			res.json(resultado.rows); // retorna ao cliente o resultado da remoção
		});
	});
});

// cria rota para consulta em uma tabela do banco de dados
app.put('/user/:codigo', function (req, res) {
	// conecta no banco a partir do canal
	canal.connect(function (erro, conexao, feito) {
		if (erro) { // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}

		var now = moment(new Date());
		var date = now.format("D/MM/YYYY-HH:mm");

		var sql = 'update tb_user set name = \'' + req.body.name + '\''
			+ ', phone = \'' + req.body.phone + '\''
			+ ', password = \'' + req.body.password + '\''
			+ ', email = \'' + req.body.email + '\''
			+ ', user_group = \'' + req.body.user_group + '\''
			+ ', active = \'' + req.body.active + '\''
			+ ', update_at = \'' + date + '\''
			+ ' where cpf =  \'' + req.params.codigo + '\'';

		console.log(sql);
		conexao.query(sql, function (erro, resultado) {
			feito(); // libera a conexão
			if (erro) {
				return console.error('Erro na atualização dos dados', erro);
			}
			res.json(resultado.rows); // retorna ao cliente o resultado da atualização
		});
	});
});

var port = 3001;
app.listen(port, function () {
  console.log('Server running in port: ' + port);
});
