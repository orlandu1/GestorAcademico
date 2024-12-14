<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'config.php';

class DeletarTarefa
{
    public static function atualizarStatus($pdo, $id)
    {
        try {
            $query = "DELETE FROM tarefas WHERE id = :id;";
            $stmt = $pdo->prepare($query);
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

    if (isset($data['data']['id'])) {
        $id = $data['data']['id'];

        $response = DeletarTarefa::atualizarStatus($pdo, $id);
        echo json_encode($response);
    } else {
        echo json_encode(["mensagem" => "ID e status são obrigatórios!"]);
    }
} else {
    echo json_encode(["mensagem" => "Método não permitido!"]);
}
