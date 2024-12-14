<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'config.php';

class BuscarTarefas
{

    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getTarefas()
    {
        try {

            $query = "SELECT * FROM tarefas ORDER BY categoria, data;";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute();

            $tarefasPorCategoria = [];

            while ($tarefa = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $categoria = $tarefa['categoria'];

                if (!isset($tarefasPorCategoria[$categoria])) {
                    $tarefasPorCategoria[$categoria] = [];
                }

                $tarefasPorCategoria[$categoria][] = [
                    "id" => $tarefa['id'],
                    "nomeTarefa" => $tarefa['nomeTarefa'],
                    "data" => $tarefa['data'],
                    "status" => $tarefa['status']

                ];
            }

            echo json_encode([
                "status" => "success",
                "tarefas" => $tarefasPorCategoria
            ]);
        } catch (PDOException $e) {
            echo json_encode([
                "status" => "error",
                "message" => "Erro ao buscar tarefas: " . $e->getMessage()
            ]);
        }
    }
}

$buscarTarefas = new BuscarTarefas($pdo);
$buscarTarefas->getTarefas();
