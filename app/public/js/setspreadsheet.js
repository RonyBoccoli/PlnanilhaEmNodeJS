var numberRows = 1;
var numberCols = 14;
var dadosTable = new Array;
var error = '';

// validators
var genreValidador = function (value, callback) {
  rs = false;
  if (value === 'Male' || value === 'Female') {
    rs = true;
  }
  callback(rs);
}

var emailValidator = function (value, callback) {
  setTimeout(function () {
    if (/.+@.+/.test(value) && String(value).trim().length > 0 && value != 'undefined' && value != null) {
      callback(true);
    }
    else {
      callback(false);
    }
  }, 1000);
};

var fieldValidator = function (value, callback) {
  
  if (value === 'undefined' || value === null || String(value).trim().length < 1) {
    callback(false);
  }
  else {
    callback(true);
  }
};

var dateValidator = function (value, callback) {

  let rs = false;
  if (String(value).trim().length > 0 && value != 'undefined' && value != null) {

    let months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
    let months31 = ["jan", "mar", "mai", "jul", "ago", "out", "dez"]
    let months30 = ["abr", "jun", "set", "nov"]
    let arr = value.split("-");
    let data = new Date();

    datA = (data.getFullYear() + '' + data.getMonth() + 1 + '' + data.getDate());
    dat = arr[2] + '' + months.indexOf(arr[1]) + '' + arr[0];

    if (dat <= datA) {

      if (arr[0] > 0) {

        if (months.includes(arr[1])) {

          if (arr[1] === 'fev') {
            if ((arr[2] % 4 == 0) && ((arr[2] % 100 != 0) || arr[2] % 400 == 0)) {
              if (arr[0] <= 29) {
                rs = true
              }
            } else if (arr[0] <= 28) {
              rs = true
            }
          } else if (months31.includes(arr[1])) {
            if (arr[0] <= 31) rs = true;
          } else if (months30.includes(arr[1])) {

            if (arr[0] <= 30) rs = true;
          }
        }
      }
    }
  }
  callback(rs);
}

var fieldValidador = function (value, callback) {

  rs = true;

  if (value === 'undefined' || value == null || String(value).trim().length < 1  ) {
    rs = false;
  }
  callback(rs);
}

var fieldNumberValidador = function (value, callback) {
  rs = false;
  if (!isNaN(parseFloat(value)) && isFinite(value)) {
    rs = true;
  }
  callback(rs);
}

//config
var hotElement = document.querySelector('#spread-sheet-conteiner'), hot;
var hotElementContainer = hotElement.parentNode;


var hotSettings = {
  columns: [
    {
      data: 'service_award',
      type: 'numeric',
      validator: fieldNumberValidador
    },
    {
      data: 'employee_number',
      type: 'numeric',
      validator: fieldNumberValidador
    },
    {
      data: 'hire_date',
      type: 'date',
      dateFormat: 'DD-MMM-YYYY',
      validator: dateValidator
    },
    {
      data: 'person_name',
      type: 'text',
      validator: fieldValidator
    },
    {
      data: 'first_name',
      type: 'text',
      validator: fieldValidator
    },
    {
      data: 'last_name',
      type: 'text',
      validator: fieldValidador
    },
    {
      data: 'email_address',
      type: 'text',
      validator: emailValidator
    },
    {
      data: 'gender',
      type: 'text',
      validator: genreValidador
    },
    {
      data: 'local',
      type: 'text',
      validator: fieldValidator
    },
    {
      data: 'supervisor_name',
      type: 'text',
      validator: fieldValidator
    },
    {
      data: 'supervisor_email_address',
      type: 'text',
      validator: emailValidator
    },
    {
      data: 'organization_name',
      type: 'text',
      validator: fieldValidator
    },
    {
      data: 'lob_6',
      type: 'text',
      validator: fieldValidator
    },
    {
      data: 'fin_person_number',
      type: 'text',
      validator: fieldValidator
    }
  ],
  licenseKey: 'non-commercial-and-evaluation',
  startRows: 15,
  maxRows:50,
  colWidths: 80,
  width: "100%",
  height: "100%",
  rowHeights: 23,
  rowHeaders: true,
  rowHeaders: true,
  nestedHeaders: [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
    ['Service Awards', 'Employee Number', 'Original Hire Date (calc)', 'Person Name', 'First Name', 'Last Name',
      'Email Address', 'Gender', 'Local', 'Supervisor Name', 'Supervisor Email Address', 'Organization Name', 'Lob 6', 'Fin Person Number']
  ]
};

var hot = new Handsontable(hotElement, hotSettings);

var emptyCell = function (value) {

  if (value === 'undefined' || value === null || value === '' || (value).toString().trim().length == 0) {
    return 'X';
  }
  return value
}

var fullName = function (element) {
  if (element[4] === 'undefined' || element[4] === null || element[4] === '' ||  element[5] === 'undefined' || element[5] === null || element[5] === '' || String(element[5]).trim().length == 0 || String(element[4]).trim().length == 0) {
    return 'X';
  } else {
    return capitalize(element[4]) + ' ' + capitalize(element[5])
  }
}

var getDate = function (value) {

  if (value === null) return 'X';

  var data;
  if (String(value).trim().length > 0 && value != 'undefined' && value != null) {
    let months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    data = value.split('-');
    data[1] = months.indexOf(data[1]) + 1;
  }
  if (Array.isArray(data)) {
    return data;
  } else {
    return 'X'
  }
}

var getFirstNane = function (value) {

  if (value == null) return 'X';
  rs = 'X';
  r = value.split(',')

  if (Array.isArray(r) && r != 'undefined' && value != ' ') {
    rs = r[1];
  }
  return rs
}

var genderFormat = function (value) {
  rs = ''
  if (value === 'Male') {
    rs = 'm'
  } else if (value === 'Female') {
    rs = 'f'
  } else {
    rs = 'X'
  }
  return rs
}

var pronomeFormat = function (args, value) {
  rs = ''
  if (value === 'Male') {
    rs = args[0];
  } else if (value === 'Female') {
    rs = args[1];
  } else {
    rs = 'X'
  };
  return rs
}

var capitalize = function (s) {
  if (typeof s !== 'string') {
    return
  }
  return s.charAt(0).toUpperCase() + s.slice(1)
}

var preView = function () {

  $('.modal-body').html('');
  $("#save").css("display", "none");
  let dadosTable;
  let count = 1;
  let html = '';
  error = '';
  json = '';


  json = JSON.parse(JSON.stringify(hot.getData()));

  
  html += '<div class="table-wrapper-scroll-y my-custom-scrollbar">';
  html += '<table id="table-wrapper-scroll" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
  html += '<thead><tr>';
  html += '<th class="th-sm">&nbsp;</th>';
  html += '<th class="th-sm">Award</th>';
  html += '<th class="th-sm">Primeiro</th>';
  html += '<th class="th-sm">Email</th>';
  html += '<th class="th-sm">Email Supervisor</th>';
  html += '<th class="th-sm">Data admissão mysql</th>';
  html += '<th class="th-sm">Data do disparo</th>';
  html += '<th class="th-sm">Data do disparo mysql</th>';
  html += '<th class="th-sm">Nome completo</th>';
  html += '<th class="th-sm">Primeiro nome gestor</th>';
  html += '<th class="th-sm">Genero</th>';
  html += '<th class="th-sm">Pronome ingles</th>';
  html += '<th class="th-sm">Pronome Portugues</th>';

  html += '</tr></thead>';
  html += '<tbody>';


  json.forEach(element => {

    console.log(element[1]);

      data = getDate(element[2]);
      if (data != "X") {

        if (Number.isInteger(parseInt(element[0]))) {
          ano = parseInt(data[2]) + parseInt(element[0]);
          dataDisparao = data[0] + '/' + data[1] + '/' + ano;
          dataDisparaoM = ano + '-' + data[1] + '-' + data[0];
        } else {
          dataDisparao = 'X';
          dataDisparaoM = 'X';
        }

        dataMysql = data[2] + '-' + data[1] + '-' + data[0];

        } else {
        dataDisparao = 'X';
        dataMysql = 'X';
        dataDisparaoM = 'X';
      }

      cl = '';
      if (emptyCell(element[0]) == 'X'
        || emptyCell(element[4]) == 'X'
        || emptyCell(element[10]) == 'X'
        || emptyCell(element[7]) == 'X'
        || getFirstNane(element[9]) == 'X'
        || fullName(element) == 'X'
        || genderFormat(element[7]) == 'X'
        || pronomeFormat(['his', 'her'], element[7]) == 'X'
        || !Number.isInteger(parseInt(element[0]))
        || dataDisparao == 'X'
        || dataDisparaoM == 'X'
      ) {
       cl = 'style ="background-color: #f00;" class="warning"';
      }

      if(element[0]!=='X' && element[4]!=='X' && element[10]!=='X' && element[7]!=='X' && element[9]!=='X' && dataDisparao !='X' && dataDisparaoM!='X'){
      html += '<tr' + cl + '>';
      html += '<td>' + count + '</td>';
      html += '<td>' + emptyCell(element[0]) + '</td>';
      html += '<td>' + capitalize(emptyCell(element[4])) + '</td>';
      html += '<td>' + emptyCell(element[6]) + '</td>';
      html += '<td>' + emptyCell(element[10]) + '</td>';
      html += '<td>' + dataMysql + '</td>';
      html += '<td>' + dataDisparao + '</td>';
      html += '<td>' + dataDisparaoM + '</td>';
      html += '<td>' + fullName(element) + '</td>';
      html += '<td>' + getFirstNane(element[9]) + '</td>';
      html += '<td>' + genderFormat(element[7]) + '</td>';
      html += '<td>' + pronomeFormat(['his', 'her'], element[7]) + '</td>';
      html += '<td>' + pronomeFormat(['o', 'a'], element[7]) + '</td>';
      html += '</tr>';
        if (cl != '') {
        error += "A linha " + count + ' possui erros<br>';
      }
      count++;
    }
  });


  if(error=='' && count>1){
    $("#save").show();
  }
  
  html += '</tbody>';
  html += '</table>';
  html += '</div>';
  html += '<div class="warning">';
  html += error;
  html += '</div>';

  $('.modal-body').html(html);
}

var salvar = function () {
  if (error === '') {
    var table= new Array();
    var count = 0;
    $('#table-wrapper-scroll tbody tr').each(function () 
    {
      var colunas = $(this).children();
     
      dados = {
        'ds_nome': $(colunas[8]).text(),
        'ds_primeiro_nome': $(colunas[2]).text(),
        'ds_email': $(colunas[3]).text(),
        'ds_nome_gestor': $(colunas[8]).text(),
        'ds_email_gestor': $(colunas[4]).text(),
        'ds_saudacao_gestor': '',
        'dt_admissao': $(colunas[5]).text(),
        'dt_envio' :  $(colunas[7]).text(),
         'ds_sexo_func': $(colunas[10]).text(),
        'ds_pronome_ingles': $(colunas[11]).text(),
        'ds_pronome_portugues': $(colunas[12]).text(),
        'fg_ativo':'nao', 
        'fg_enviado':'nao',
        'nr_tempo_servico' : ''  
        };
      table[count] = dados ;
      count++;
    });

    //console.log(JSON.stringify(table));
     
     $.ajax({
       url: "/funcionario/salvar",
       data: {table}, 
       type: 'POST',
       cache: false,
       beforeSend: function () {
        $("#save").hide();
        $("#loader").show();
       },
       success: function (res) {
         rs = JSON.parse(res);
        $("#save").show();
        $("#loader").hide();

        if(rs.error==true){
            alert('Dados salvos');
            window.location.href="/funcionario/index"
          }else{
            alert(rs.result);
          }
        },
       error: function () {
        $("#save").show();
        $("#loader").hide();
        $('#toast').toast('show')
        alert('Houve um erro por favor entre em contato com suporte');
       }
     });
   } else {

    alert('')

  }
}
