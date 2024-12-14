<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'config.php';

class TarefaHandler
{
    public static function atualizarStatus($pdo, $id, $status)
    {
        try {
            $query = "UPDATE tarefas SET status = :status WHERE id = :id;";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                return ["mensagem" => "Tarefa atualizada com sucesso!"];
            } else {
                return ["mensagem" => "Erro ao atualizar a tarefa."];
            }
        } catch (PDOException $e) {
            return ["mensagem" => "Erro: " . $e->getMessage()];
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['data']['id']) && isset($data['data']['status'])) {
        $id = $data['data']['id'];
        $status = $data['data']['status'];

        $response = TarefaHandler::atualizarStatus($pdo, $id, $status);
        echo json_encode($response);
    } else {
        echo json_encode(["mensagem" => "ID e status são obrigatórios!"]);
    }
} else {
    echo json_encode(["mensagem" => "Método não permitido!"]);
}
