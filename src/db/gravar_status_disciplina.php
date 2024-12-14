<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'config.php';

class Gravar_status_disciplina
{
    private $pdo;
    private $id;
    private $action;

    public function __construct($pdo, $id, $action)
    {
        $this->pdo = $pdo;
        $this->id = $id;
        $this->action = $action;
    }

    public static function setStatusDisciplina($pdo, $id, $action)
    {
        try {
            if ($action == 'aprovar') {
                $query = 'UPDATE disciplinas SET situacao = :situacao WHERE id = :id;';
                $valor = 1;
            } elseif ($action == 'reprovar') {
                $query = 'UPDATE disciplinas SET situacao = :situacao WHERE id = :id;';
                $valor = 2;
            } elseif ($action == 'resetar') {
                $query = 'UPDATE disciplinas SET situacao = :situacao WHERE id = :id;';
                $valor = 0;
            } elseif ($action == 'excluir') {
                $query = 'DELETE FROM disciplinas WHERE id = :id;';
                $valor = null;
            } else {
                return ["mensagem" => "Ação inválida."];
            }

            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':id', $id);
            if ($action !== 'excluir') {
                $stmt->bindParam(':situacao', $valor);
            }

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

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'], $data['action'])) {
    echo json_encode(["error" => "Parâmetros inválidos."]);
    exit;
}

$id = $data['id'];
$action = $data['action'];

$result = Gravar_status_disciplina::setStatusDisciplina($pdo, $id, $action);
echo json_encode($result);
exit;
