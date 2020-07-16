module.exports.index = function(application, req, res){
	res.render("funcionarios/index");
}

module.exports.funcinario_salvar = function(application, req, res){
    var error ='';
   
    for(let i = 0; i < req.body.table.length; i++)        
    {
       
        if(validarVazio(req.body.table[i].ds_nome)){
            error+="Campo nome possui erro na linha " + (i+1) + " \n";
        }

        if(validarVazio(req.body.table[i].ds_primeiro_nome)){
            error+="Campo nome completo possui erro na linha  " + (i+1) + " \n";
        }

        if(validarVazio(req.body.table[i].ds_email)){
            error+="Campo email possui erro na linha " + (i+1) +" \n";
        }

        if(validarVazio(req.body.table[i].ds_nome_gestor)){
            error+="Campo primeiro nome gestor possui erro na linha " + (i+1) +" \n";
        }
       
        if(validarVazio(req.body.table[i].ds_email_gestor)){
            error+="Campo email do gestor possui erro na linha " + (i+1) +" \n";
        }

        if(validarVazio(req.body.table[i].ds_saudacao_gestor)){
            error+="Campo tipo de saudação do gestor possui erro na linha " + (i+1) +" \n";
        }

        if(validarVazio(req.body.table[i].dt_admissao)){
            error+="Campo data de admissão possui erro na linha " + (i+1) +" \n";
        }

        if(validarVazio(req.body.table[i].dt_envio)){
            error+="Campo data de envio possui erro na linha " + (i+1) +" \n";
        }
        
        let genero = req.body.table[i].ds_sexo_func;
        if(validarVazio(req.body.table[i].ds_sexo_func) && genero.toString().trim() !== "m" && genero.toString().trim() !== "f"){
            error+="Campo genero possui erro na linha " + (i+1) +" \n";
        }
        
        if(validarVazio(req.body.table[i].ds_pronome_ingles) && req.body.table[i].ds_pronome_ingles!='her' && req.body.table[i].ds_pronome_ingles!='his' ){
            error+="Campo pronome em ingles possui erro na linha " + (i+1) +" \n";
        }

        if(validarVazio(req.body.table[i].ds_pronome_portugues) && req.body.table[i].ds_pronome_portugues !='0' && req.body.table[i].ds_pronome_portugues != 'a' ){
            error+="Campo pronome em português possui erro na linha " + (i+1) +" \n";
        }
    }

    if(error!=''){
        error += error; 
    }
    else{
        for(let i = 0; i < req.body.table.length; i++)        
        {   
            var connection = application.config.dbConnection();
            var funcionarioModel = new application.app.models.FuncionariosDAO(connection);
        
            funcionarioModel.salvarFuncionario(req.body.table[i], function(error, result){ 
            });
            }	
        error = true;    
    }
   
    res.end( JSON.stringify({result: 'ok' , error:error}));
    res.redirect('/index');
}

var validarVazio = function(value){
    if (value != null && value !== undefined) {
        return false
    }else{
        return true
    }
}


