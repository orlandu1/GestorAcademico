export const setStatus = (id, status, atualizarTarefas) => {

    const data = {
        data: {
            id: id,
            status: status
        }
    };


    fetch("/db/gravar_status.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((resposta) => {
            if (resposta.mensagem) {
                if (atualizarTarefas) atualizarTarefas();
                console.log(resposta.mensagem);
            } else {
                console.error("Resposta inesperada do servidor:", resposta);
            }
        })

        .catch((error) => {
            console.error("Erro ao enviar os dados:", error);
        });
}

export const setTrash = (id,  atualizarTarefas) => {

    const data = {
        data: {
            id: id,
        }
    };


    fetch("/db/deletar_tarefa.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((resposta) => {
            if (resposta.mensagem) {
                if (atualizarTarefas) atualizarTarefas();
                console.log(resposta.mensagem);
            } else {
                console.error("Resposta inesperada do servidor:", resposta);
            }
        })

        .catch((error) => {
            console.error("Erro ao enviar os dados:", error);
        });
}