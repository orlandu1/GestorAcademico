<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

require 'config.php';

class BuscarDisciplinas
{

    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public static function getDisciplinas($pdo)
    {

        $sql = "SELECT * FROM disciplinas ORDER BY semestre, disciplina;";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $disciplinas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($disciplinas);

    }


}

BuscarDisciplinas::getDisciplinas($pdo);