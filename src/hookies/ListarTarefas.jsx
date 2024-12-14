const ListarTarefas = async () => {
    const response = await fetch("/db/buscar_tarefas.php");
    const data = await response.json();

    if (data.status === "success") {
        return data.tarefas; 
    } else {
        throw new Error(data.message || "Erro ao buscar tarefas.");
    }
};

export default ListarTarefas;
