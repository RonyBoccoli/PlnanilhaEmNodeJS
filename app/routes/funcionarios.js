module.exports = function(application){

	application.get('/funcionario/index', function(req, res){
		application.app.controllers.funcionario.index(application, req, res);
	});

	application.post('/funcionario/salvar', function(req, res){
		application.app.controllers.funcionario.funcinario_salvar(application, req, res);
	});
}

