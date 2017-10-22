angular.module('app.service', [])

  .service('Estabelecimentos', Estabelecimentos)

Estabelecimentos.$inject = ['$http'];

function Estabelecimentos($http) {
  return {
    getEstabelecimentoEsp: getEstabelecimentoEsp,
    getEstabelecimentos: getEstabelecimentos,
    postEstabelecimentos: postEstabelecimentos,
    getServicos: getServicos,
    getPagamentos: getPagamentos,
    getReservas: getReservas


  };

  function getEstabelecimentos() {
    var req = {
      method: 'GET',
      url: 'http://localhost:3000/consulta'
    };

    return $http(req)
      .then(function (result) {
        return result.data;
        console.log('Get Estabelecimentos', response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getServicos() {
    var req = {
      method: 'GET',
      url: 'http://localhost:3000/consultaServicos'
    };
    

    return $http(req)
      .then(function (result) {
        return result.data;
        console.log('Get Estabelecimentos', response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  function getReservas() {
    var req = {
      method: 'GET',
      url: 'http://localhost:3000/consultaReservas'
    };
    

    return $http(req)
      .then(function (result) {
        return result.data;
        console.log('Get Reservas', response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }




  function getEstabelecimentoEsp() {
    var req = {
      method: 'GET',
      url: 'http://localhost:3000/consultaEspecifico'
    };

    return $http(req)
      .then(function (result) {
        return result.data;
        console.log('Get Estabelecimentos Especificos', response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getPagamentos() {
    var req = {
      method: 'GET',
      url: 'http://localhost:3000/consultaPagamento'
    };

    return $http(req)
      .then(function (result) {
        return result.data;
        console.log('Get Pagamentos', response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  function postEstabelecimentos(id_reserva,id_cliente, id_servico, id_tipo_pagamento, id_estabelecimento, data_reserva, horario, fg_ativo) {
     console.log("id reserva: " + id_reserva);
    console.log("id cliente: " + id_cliente);
    console.log("id servico " + id_servico);
    console.log("id tipo pagamento " + id_tipo_pagamento);
    console.log("id_tipo_estabelecimento " + id_estabelecimento);
    console.log("data reserva" + data_reserva);
    console.log("horario" + horario);
    console.log("fg_ativo" + fg_ativo);
    //console.log(id_servico);
    var req = {
      method: 'POST',
      url: 'http://localhost:3000/insere',
      data: {
        id_reserva: id_reserva,
        id_cliente: id_cliente,
        id_servico: id_servico,
        id_tipo_pagamento: id_tipo_pagamento,
        id_estabelecimento: id_estabelecimento,
        data_reserva: data_reserva,
        horario: horario,
        fg_ativo: fg_ativo
      }
    };

    $http(req).then(function (result) {
      $ionicPopup.alert({
        title: 'Reserva',
        template: 'Reserva efetuada!'
      }).then(function (result) { 
         result = true;
      });
    });

    // return $http.post('http://localhost:3000/insere')
    //   .then(function (response) {
    //     console.log('Inseriu Produto', response);
    //     return response.data;
    //   });
  };
} 