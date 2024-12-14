<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'config.php';


class GravarTarefa
{
    private $nomeTarefa;
    private $categoria;
    private $dataTarefa;
    private $status;
    private $pdo;

    public function __construct($pdo, $nomeTarefa, $categoria, $dataTarefa, $status = 0)
    {
        $this->pdo = $pdo;
        $this->nomeTarefa = $nomeTarefa;
        $this->categoria = $categoria;
        $this->dataTarefa = $dataTarefa;
        $this->status = $status;
    }

    public static function setTarefa($pdo, $nomeTarefa, $categoria, $dataTarefa, $status)
    {
        try {
            $query = "INSERT INTO tarefas (nomeTarefa, categoria, data, status) VALUES (:nomeTarefa, :categoria, :data, :status);";
            $stmt = $pdo->prepare($query);

            $stmt->bindParam(':nomeTarefa', $nomeTarefa);
            $stmt->bindParam(':categoria', $categoria);
            $stmt->bindParam(':data', $dataTarefa);
            $stmt->bindParam(':status', $status);


            if ($stmt->execute()) {
                echo json_encode(["mensagem" => "Tarefa gravada com sucesso!"]);
            } else {
                echo json_encode(["mensagem" => "Erro ao gravar a tarefa."]);
            }
        } catch (PDOException $e) {
            echo json_encode(["mensagem" => "Erro: " . $e->getMessage()]);
        }
    }
}



$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['nomeTarefa']) && isset($data['categoria']) && isset($data['data'])) {
    $nomeTarefa = $data['nomeTarefa'];
    $categoria = $data['categoria'];
    $dataTarefa = $data['data'];
    $status = 0;

    GravarTarefa::setTarefa($pdo, $nomeTarefa, $categoria, $dataTarefa, $status);

} else {
    echo json_encode(["mensagem" => "Dados incompletos!"]);
}
