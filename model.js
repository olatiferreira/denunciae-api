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
	password: "postgres",
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
		
		conexao.query(sql, function (erro, resultado) {
			feito(); // libera a conexão
			if (erro) {
				return console.error('Erro na atualização dos dados', erro);
			}
			res.json(resultado.rows); // retorna ao cliente o resultado da atualização
		});
	});
});

// cria rota para consulta em uma tabela do banco de dados
app.post('/addSolicitation', function (req, res) {
	// conecta no banco a partir do canal
	canal.connect(function (erro, conexao, feito) {
		if (erro) { // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}

		var now = moment(new Date());
		var date = now.format("D/MM/YYYY-HH:mm");

		var sql = 'insert into tb_solicitation (user_id, name, category, description, picture, geolocalization, status, entry_date) values (\''
		+ req.body.user_id + '\', \''
		+ req.body.name + '\', \''
		+ req.body.category + '\',\' '
		+ req.body.description + '\',\' '
		+ req.body.picture + '\',\' '
		+ req.body.geolocalization + '\',\' '
		+ 'Em processamento' + '\',\' '			
		+ date + '\')';			

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
app.get('/solicitation', function (req, res) {
	// conecta no banco a partir do canal
	canal.connect(function (erro, conexao, feito) {
		if (erro) { // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'select * from tb_solicitation';
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
app.get('/solicitation/:codigo', function (req, res) {
	// conecta no banco a partir do canal
	canal.connect(function (erro, conexao, feito) {
		if (erro) { // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'select * from tb_solicitation where solicitation_id = ' + req.params.codigo;
		
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
app.delete('/solicitation/:codigo', function (req, res) {
	// conecta no banco a partir do canal
	canal.connect(function (erro, conexao, feito) {
		if (erro) { // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'delete from tb_solicitation where solicitation_id = ' + req.params.codigo;
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
app.put('/solicitation/:codigo', function (req, res) {
	// conecta no banco a partir do canal
	canal.connect(function (erro, conexao, feito) {
		if (erro) { // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}

		var now = moment(new Date());
		var date = now.format("D/MM/YYYY-HH:mm");

		var sql = 'update tb_solicitation set name = \'' + req.body.name + '\''
		+ ', category = \'' + req.body.category + '\''
		+ ', description = \'' + req.body.description + '\''
		+ ', picture = \'' + req.body.picture + '\''
		+ ', geolocalization = \'' + req.body.geolocalization + '\''
		+ ', status = \'' + req.body.status + '\''
		+ ', update_at = \'' + date + '\''
		+ ' where solicitation_id =  \'' + req.params.codigo + '\'';
		
		conexao.query(sql, function (erro, resultado) {
			feito(); // libera a conexão
			if (erro) {
				return console.error('Erro na atualização dos dados', erro);
			}
			res.json(resultado.rows); // retorna ao cliente o resultado da atualização
		});
	});
});

// cria rota para consulta em uma tabela do banco de dados
app.post('/solicitation/:codigo/vote', function (req, res) {
	// conecta no banco a partir do canal
	canal.connect(function (erro, conexao, feito) {
		if (erro) { // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}

		var now = moment(new Date());
		var date = now.format("D/MM/YYYY-HH:mm");

		var sql = 'insert into tb_solicitation_votes (solicitation_id, user_id, vote, entry_date) values (\''
		+ req.params.codigo + '\', \''
		+ req.body.user_id + '\', \''
		+ req.body.vote + '\',\' '				
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
app.post('/solicitation/:codigo/history', function (req, res) {
	// conecta no banco a partir do canal
	canal.connect(function (erro, conexao, feito) {
		if (erro) { // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}

		var now = moment(new Date());
		var date = now.format("D/MM/YYYY-HH:mm");

		var sql = 'insert into tb_solicitation_history (solicitation_id, user_id, description, status, entry_date) values (\''
		+ req.params.codigo + '\', \''
		+ req.body.user_id + '\', \''
		+ req.body.description + '\',\' '
		+ req.body.status + '\',\' '
		+ date + '\')';			

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
app.get('/history', function (req, res) {
	// conecta no banco a partir do canal
	canal.connect(function (erro, conexao, feito) {
		if (erro) { // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'select * from tb_solicitation_history';
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
app.get('/history/:codigo', function (req, res) {
	// conecta no banco a partir do canal
	canal.connect(function (erro, conexao, feito) {
		if (erro) { // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'select * from tb_solicitation where solicitation_id = ' + req.params.codigo;
		
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
app.get('/history/:codigo', function (req, res) {
	// conecta no banco a partir do canal
	canal.connect(function (erro, conexao, feito) {
		if (erro) { // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'select * from tb_solicitation_history where user_id = ' + req.params.codigo;
		
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
app.put('/history/:codigo', function (req, res) {
	// conecta no banco a partir do canal
	canal.connect(function (erro, conexao, feito) {
		if (erro) { // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}

		var now = moment(new Date());
		var date = now.format("D/MM/YYYY-HH:mm");

		var sql = 'update tb_solicitation_history set description = \'' + req.body.description + '\''
		+ ', status = \'' + req.body.status + '\''		
		+ ', update_at = \'' + date + '\''
		+ ' where solicitation_history_id =  \'' + req.params.codigo + '\'';
		
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