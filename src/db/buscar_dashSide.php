<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'config.php';

class Buscar_dashSide
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getContagemPorSituacao()
    {
        try {
            $query = "
                SELECT 
                    situacao, 
                    COUNT(*) AS quantidade 
                FROM 
                    disciplinas 
                GROUP BY 
                    situacao
            ";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute();
            $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $dados = [
                "aprovado" => 0,
                "reprovado" => 0,
                "falta_cursar" => 0,
                "total" => 0,
                "porcentagem_aprovado" => 0
            ];

            foreach ($resultados as $resultado) {
                switch ($resultado['situacao']) {
                    case 1:
                        $dados['aprovado'] = $resultado['quantidade'];
                        break;
                    case 2:
                        $dados['reprovado'] = $resultado['quantidade'];
                        break;
                    case 0:
                        $dados['falta_cursar'] = $resultado['quantidade'];
                        break;
                }
            }

            $dados['total'] = $dados['aprovado'] + $dados['reprovado'] + $dados['falta_cursar'];
            if ($dados['total'] > 0) {
                $dados['porcentagem_aprovado'] = round(($dados['aprovado'] / $dados['total']) * 100, 2);
            }

            return $dados;
        } catch (PDOException $e) {
            return [
                "error" => "Erro ao buscar os dados: " . $e->getMessage()
            ];
        }
    }
}

$dash = new Buscar_dashSide($pdo);
$dados = $dash->getContagemPorSituacao();

echo json_encode($dados);
