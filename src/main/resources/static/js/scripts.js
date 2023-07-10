const url = "http://localhost:8080/api/v1/tasks"
















function cadastrarTarefa(){
    var titulo = $('#titulo').val();
    var descricao = $('#descricao').val();
    var responsavel = $('#responsavel').val();
    var prioridade = $('#prioridade').val();
    var deadline = $('#deadline').val();

    if(titulo == null || titulo != null && titulo.trim() == " "){
        $('#titulo').focus();
        alert("Informe o Título: ")
        return;
    }
    if(descricao == null || descricao != null && descricao.trim() == " "){
       $('#descricao').focus();
        alert("Informe uma descrição: ")
        return;
    }
    if(responsavel == null || responsavel != null && responsavel.trim() == " "){
       $('#responsavel').focus();
        alert("Informe uma responsável pela tarefa: ")
        return;
    }
   if(prioridade == null || prioridade != null && prioridade.trim() == " "){
        $('#prioridade').focus();
        alert("Informe uma prioridade: ")
        return;
    }
   if(deadline == null || deadline != null && deadline.trim() == " "){
        $('#deadline').focus();
        alert("Informe um prazo para a finalização da tarefa: ")
        return;
    }

   $.ajax({
            method: "POST",
            url: " /api/v1/tasks",
            data: JSON.stringify({titulo: titulo, descricao: descricao, responsavel: responsavel, prioridade: prioridade, deadline: deadline}),
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                $("#titulo").val(response.titulo);
                $("#descricao").val(response.descricao);
                $("#responsavel").val(response.responsavel);
                $("#prioridade").val(response.prioridade);
                $("#deadline").val(response.deadline);
                alert("Gravou com succeso!");
            }
        }).fail(function (xhr, status, errorThrown){
           alert("Erro ao cadastrar a tarefa: " +xhr.responseText);
        });