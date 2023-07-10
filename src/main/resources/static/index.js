//================================================================
async function cadastrarTarefa() {
    var titulo = document.getElementById("titulo").value;
    var descricao = document.getElementById("descricao").value;
    var responsavel = document.getElementById("responsavel").value;
    var prioridade = document.getElementById("prioridade").value;
    var deadline = document.getElementById("deadline").value;

    fetch("http://localhost:8080/api/v1/tasks", {
        headers: {
         'Content-Type': 'application/json',
         'Connection': 'keep-alive'
         },
        method: "POST",
        body: JSON.stringify({"titulo": titulo,
                  "descricao": descricao,
                  "responsavel": responsavel,
                  "prioridade": prioridade,
                  "deadLine": deadline
                  })

    })
    .then(response => response.json())
    .then(data => {
        console.log("Tarefa cadastrada com sucesso:", data);
        // Faça algo com a resposta do servidor, se necessário
    })
    .catch(error => {
        console.error("Erro ao cadastrar tarefa:", error);
        // Trate o erro, se necessário
    });

}
//====================================================================

async function atualizarTarefa(taskId) {
     var titulo = document.getElementById("titulo").value;
     var descricao = document.getElementById("descricao").value;
     var updatedData = {titulo, descricao}
     fetch(`http://localhost:8080/api/v1/tasks/${taskId}/edita`, {
         headers: {
          'Content-Type': 'application/json',
          'Connection': 'keep-alive'
          },
         method: "PUT",
         body: JSON.stringify(updatedData)
     })
     .then(response => response.json())
     .then(data => {
         console.log("Tarefa atualizada com sucesso:", data);
         // Faça algo com a resposta do servidor, se necessário
     })
     .catch(error => {
         console.error("Erro ao atualizar tarefa:", error);
         // Trate o erro, se necessário
     });
 }

 function redirecionarParaEdicao(taskId) {
   // Concatenar o ID com o caminho do arquivo HTML
  var url = "./indexTres.html?id=" + taskId;

   // Redirecionar o usuário para a nova página
   window.location.href = url;
 }


//======================================================================
async function concluirTarefa(taskId) {
    console.log(taskId);
    fetch(`http://localhost:8080/api/v1/tasks/${taskId}/concluida`, {
        method: "PUT"
    })
    .then(response => response.json())
    .then(data => {
        console.log("Tarefa concluída com sucesso:", data);
        // Faça algo com a resposta do servidor, se necessário
    })
    .catch(error => {
        console.error("Erro ao concluir tarefa:", error);
        // Trate o erro, se necessário
    });
}

//=====================================================================

async function excluirTarefa(taskId) {
    console.log(taskId);
    fetch(`http://localhost:8080/api/v1/tasks/${taskId}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            console.log("Tarefa excluída com sucesso");
            // Faça algo com a resposta do servidor, se necessário
        } else {
            console.error("Erro ao excluir tarefa. Código de resposta:", response.status);
            // Trate o erro, se necessário
        }
    })
    .catch(error => {
        console.error("Erro ao excluir tarefa:", error);
        // Trate o erro, se necessário
    });
}




// Usar o ID da tarefa como desejar

async function renderizarEdicaoTask(taskId) {

      var task = new URL("http://localhost:8080/api/v1/tasks/buscarPorId");
      task.searchParams.append("id", taskId);

      fetch(task)
          .then(response => response.json())
          .then(data => {
          if(data.status === 400) return;
            console.log("Tarefa encontrada com sucesso:", data);
            var titulo = document.getElementById("titulo")
            var descricao = document.getElementById("descricao")
            titulo.value = data.titulo;
            descricao.value = data.descricao;
            var button = document.getElementById("confirmarAtualizacao")
            button.addEventListener("click", function(){atualizarTarefa(data.id)})
            }).catch(err => {})

}

// Obter o caminho completo da URL
var path = window.location.pathname;

if(path.includes("indexTres.html")){
var urlParams = new URLSearchParams(window.location.search);
var taskId = urlParams.get('id');

//CHAMAR FUNÇÃO DE RENDERIZAR FUNÇÃO
renderizarEdicaoTask(taskId)


}

async function buscarTarefa() {
  var id = document.getElementById("id").value;
  var titulo = document.getElementById("titulo").value;
  var responsavel = document.getElementById("responsavel").value;
  var status = document.getElementById("status").value;

  var url = new URL("http://localhost:8080/api/v1/tasks/buscar");
  url.searchParams.append("id", id);
  url.searchParams.append("titulo", titulo);
  url.searchParams.append("responsavel", responsavel);
  url.searchParams.append("status", status);


  // Ocultar a div de resultado antes de consultar a tarefa
  var resultadoDiv = document.getElementById("resultado");
  resultadoDiv.style.display = "none";

  fetch(url)
    .then(response => response.json())
    .then(data => {
    if(data.status === 400) return;
      console.log("Tarefa encontrada com sucesso:", data);

      // Verificar se há um resultado retornado pela API
      if (Object.keys(data).length > 0) {
        // Criar um contêiner para os elementos ID, título e responsável
        var infoContainer = document.createElement("div");
        infoContainer.id = "info-container";
        infoContainer.className = "info-container";

        // Criar os elementos HTML para exibir os dados da tarefa
        var idElement = document.createElement("p");
        idElement.textContent = "Número: " + data.id;

        var tituloElement = document.createElement("p");
        tituloElement.textContent = "Título: " + data.titulo;

        var responsavelElement = document.createElement("p");
        responsavelElement.textContent = "Responsável: " + data.responsavel;

        var botaoEditar = document.createElement("button")
        botaoEditar.textContent = "Editar"
        botaoEditar.addEventListener("click", function(){redirecionarParaEdicao(data.id)})


        var botaoConcluir = document.createElement("button")
                botaoConcluir.textContent = "Concluir"
                botaoConcluir.addEventListener("click", function(){concluirTarefa(data.id)})

        var botaoDeletar = document.createElement("button")
                        botaoDeletar.textContent = "Excluir"
                        botaoDeletar.addEventListener("click", function(){excluirTarefa(data.id)})


        // Limpar o conteúdo anterior da div de resultado
        resultadoDiv.innerHTML = "";

        // Adicionar os elementos à div de resultado
        infoContainer.appendChild(idElement);
        infoContainer.appendChild(tituloElement);
        infoContainer.appendChild(responsavelElement);
        resultadoDiv.appendChild(infoContainer);


        infoContainer.appendChild(botaoConcluir);
        infoContainer.appendChild(botaoEditar);
        infoContainer.appendChild((botaoDeletar));

        // Exibir a div de resultado após a consulta
        resultadoDiv.style.display = "block";
      }
    })
    .catch(error => {
      console.error("Erro ao encontrar tarefa:", error);
      // Trate o erro, se necessário
    });
}








