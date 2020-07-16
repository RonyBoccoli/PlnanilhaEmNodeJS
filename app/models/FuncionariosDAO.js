function FuncionariosDAO(connection) {
    this._connection = connection;
}
FuncionariosDAO.prototype.getNoticias = function (callback) {
    this._connection.query('select * from funcionario', callback);
}

FuncionariosDAO.prototype.getNoticia = function (callback) {
    this._connection.query('select * from funcionario where = 2', callback);

}

FuncionariosDAO.prototype.salvarFuncionario = function (funcionario, callback) {
    this._connection.query("INSERT INTO funcionario set ?", funcionario, callback);
    
}

module.exports = function () {
    return FuncionariosDAO;
}
