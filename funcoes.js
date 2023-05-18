  
function obterMensagens() {

    var retorno = [];

    var consulta = $.ajax({
        url: 'http://prj-p2-js.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        async: false
    }).fail(function(){
        return retorno;
    });

    consulta.done(function(data) {
        retorno = data;
    });

    return retorno;
}

function inserirMensagem(obj) {

    var inserir = $.ajax({

        url: 'http://prj-p2-js.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(obj),
        dataType: 'json',
        async: false,
        contentType: 'application/json',
    });
}

function excluirMensagem(idMsg) {

    var inserir = $.ajax({

        url: 'http://prj-p2-js.herokuapp.com/mensagens' + '/' + toString(idMsg),
        method: 'DELETE',
        async: false
    });
}


function validarUsuario(objLoginSenha) {

    //email: admin@admin.com
    //senha: '1234'

    var retorno = false;

    console.log(objLoginSenha);

    var validacao = $.ajax({
        url: 'http://prj-p2-js.herokuapp.com/usuarios/validar',
        method: 'POST',
        dataType: 'json',
        async: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
                },
        contentType: 'application/json',
        data: JSON.stringify(objLoginSenha)
    }).fail(function(){
        return retorno;
    });

    validacao.done(function(data) {
        retorno = data;
    });

    return retorno;
}

function validar() {

    var dado = {};

    dado.email = document.getElementById("idemail").value;
    dado.senha = document.getElementById("idsenha").value;

    if (validarUsuario(dado) == true) {

        location.href="mensagem.html";

    } else {

        window.alert("usuario e senha incorretos");
    }
}

function inserir() {   
    
    var objt = {};

    objt.nome = document.getElementById("nome").value;
    objt.email = document.getElementById("email").value;
    objt.mensagem = document.getElementById("mensagem").value;

    inserirMensagem(objt);

}

var array = obterMensagens();
var tableBody = document.getElementById("table-body");

for (var i = 0; i < array.length; i++) {
    var row = document.createElement("tr");
    var indexCell = document.createElement("td");
    indexCell.textContent = array[i].nome;
    var valueCell = document.createElement("td");
    valueCell.textContent = array[i].mensagem;

    row.appendChild(indexCell);
    row.appendChild(valueCell);
    tableBody.appendChild(row);
}
