import React from 'react'
import { calcularDiasRestantes, converterData } from '../../../hookies/dateutils.jsx'
import { setStatus, setTrash } from '../../../hookies/setTarefasStatus.jsx'
import { useTarefas } from '../../../hookies/useTarefas';

const Evento = () => {

    const { tarefas, atualizarTarefas } = useTarefas();
    const evento = tarefas?.evento || [];

    return (
        <div>
            <p>Eventos</p>
            <hr />
            <table style={{ borderTop: 'solid 1px #111', paddingTop: '30px' }}>
                <thead>
                    <tr>
                        <th>Tarefa</th>
                        <th>Prazo</th>
                        <th>Restam</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {evento?.map((tarefa) => (
                        <tr key={tarefa.id}>
                            <td>{tarefa.nomeTarefa}</td>
                            <td>{converterData(tarefa.data)}</td>
                            <td>{calcularDiasRestantes(tarefa.data)} dias</td>
                            <td>
                                <button
                                    onClick={() => setStatus(tarefa.id, 1, atualizarTarefas)}
                                    style={tarefa.status == 1 ? {
                                        background: 'none',
                                        cursor: 'pointer',
                                        border: 'solid 1px green'
                                    } : {
                                        background: 'none',
                                        cursor: 'pointer',
                                        border: 'solid 1px orangered'
                                    }}
                                >
                                    {tarefa.status === 1 ? '✔️' : '⌛'}
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => setTrash(tarefa.id, atualizarTarefas)}
                                    style={{
                                        background: 'none',
                                        cursor: 'pointer',
                                        color: 'red',
                                        border: 'solid 1px #ccc'
                                    }}
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Evento
