<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

require 'config.php';

class GravarDisciplina
{
    private $pdo;
    private $semestre;
    private $disciplina;
    private $situacao;

    public function __construct($pdo, $semestre, $disciplina, $situacao)
    {
        $this->pdo = $pdo;
        $this->semestre = $semestre;
        $this->disciplina = $disciplina;
        $this->situacao = $situacao;
    }

    public static function setDisciplinas($pdo, $semestre, $disciplina, $situacao)
    {
        $sql = "INSERT INTO disciplinas (semestre, disciplina, situacao) VALUES (:semestre, :disciplina, :situacao)";
        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            ':semestre' => $semestre,
            ':disciplina' => $disciplina,
            ':situacao' => $situacao
        ]);
        echo json_encode(["success" => "Disciplina inserida com sucesso!"]);
    }
}


$data = json_decode(file_get_contents("php://input"), true);


if (!isset($data['semestre'], $data['disciplina'], $data['situacao'])) {
    echo json_encode(["error" => "Parâmetros inválidos. 'semestre', 'disciplina' e 'situacao' são obrigatórios."]);
    exit;
}

$semestre = $data['semestre'];
$disciplina = $data['disciplina'];
$situacao = $data['situacao'];


GravarDisciplina::setDisciplinas($pdo, $semestre, $disciplina, $situacao);