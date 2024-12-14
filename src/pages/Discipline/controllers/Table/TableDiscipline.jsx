import React from 'react';
import './TableDiscipline.css';

const TableDiscipline = ({ disciplinas, loadDisciplinas }) => {

    const groupBySemester = (disciplinas) => {
        return disciplinas.reduce((acc, disciplina) => {
            const semestre = disciplina.semestre;
            if (!acc[semestre]) {
                acc[semestre] = [];
            }
            acc[semestre].push(disciplina);
            return acc;
        }, {});
    };

    const groupedDisciplinas = groupBySemester(disciplinas);

    const action = (action, id) => {

        if (action === 'excluir' && !confirm('Tem certeza que quer excluir?')) {
            return;
        }

        let data = {
            action: action,
            id: id
        };

        fetch("/db/gravar_status_disciplina.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((resposta) => {
                if (resposta.mensagem) {
                    console.log("Sucesso:", resposta);
                    loadDisciplinas();
                } else {
                    console.error("Resposta inesperada do servidor:", resposta);
                }
            })
            .catch((error) => {
                console.error("Erro ao enviar os dados:", error);
            });
    };

    return (
        <div className='container-table'>
            {Object.keys(groupedDisciplinas).length === 0 ? (
                <p>Nenhuma disciplina cadastrada.</p>
            ) : (
                Object.keys(groupedDisciplinas).map((semestre, index) => (
                    <div key={index} className="semestre-table">
                        <table style={{ marginTop: '20px' }}>
                            <thead>
                                <tr>
                                    <th>Disciplina | {semestre} Semestre</th>
                                    <th>Situação</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedDisciplinas[semestre].map((disciplina, idx) => (
                                    <tr key={idx}>
                                        <td>{disciplina.disciplina}</td>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                backgroundColor:
                                                    disciplina.situacao == 1
                                                        ? "#27ae60"
                                                        : disciplina.situacao == 2
                                                            ? "#e74c3c"
                                                            : "#e67e22",
                                                color:
                                                    disciplina.situacao == 1 || disciplina.situacao == 0
                                                        ? "#ecf0f1"
                                                        : "#ecf0f1",
                                            }}
                                        >
                                            {disciplina.situacao == 1
                                                ? "APROVADO"
                                                : disciplina.situacao == 2
                                                    ? "REPROVADO"
                                                    : "FALTA CURSAR"}
                                        </td>
                                        <td style={{paddingLeft: '0px'}}>
                                            <button onClick={() => action("aprovar", disciplina.id)}>✅ Aprovar</button>
                                            <button onClick={() => action("reprovar", disciplina.id)}>❌ Reprovar</button>
                                            <button onClick={() => action("excluir", disciplina.id)}>🗑️ Excluir</button>
                                            <button onClick={() => action("resetar", disciplina.id)}>🔄 Resetar</button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                ))
            )}
        </div>
    );
};

export default TableDiscipline;
