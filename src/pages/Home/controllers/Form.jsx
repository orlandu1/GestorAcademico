import React, { useState } from 'react'
import { useTarefas } from '../../../hookies/useTarefas';

const Form = () => {

    const { atualizarTarefas } = useTarefas();

    const [cadastro, setCadastro] = useState({
        nomeTarefa: '',
        categoria: '',
        data: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCadastro({
            ...cadastro,
            [name]: value
        });
    };

    const handleCadastro = (e) => {
        e.preventDefault();

        if (!cadastro.nomeTarefa.trim() || !cadastro.categoria.trim() || !cadastro.data.trim()) {
            alert('Preencha todos os campos!');
            return;
        }

        fetch("/db/gravar_tarefa.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cadastro)
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.mensagem);
                atualizarTarefas();
                setCadastro({
                    nomeTarefa: '',
                    categoria: '',
                    data: ''
                });
            })
            .catch((error) => {
                console.error("Erro ao enviar os dados:", error);
            });
    };

    return (
        <div>
            <p>Cadastrar Tarefa</p>
            <hr />
            <div className='container-form'>
                <form className='FormSelect' onSubmit={handleCadastro}>
                    <div className='main-form'>
                        <div style={{ marginRight: '15px' }}>
                            <input
                                type="text"
                                name="nomeTarefa"
                                placeholder="Nome Da Tarefa"
                                autoFocus
                                value={cadastro.nomeTarefa}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ marginRight: '15px' }}>
                            <select
                                name="categoria"
                                required="required"
                                value={cadastro.categoria}
                                onChange={handleChange}
                            >
                                <option value="">Categoria</option>
                                <option value="avaliacao">Avaliação</option>
                                <option value="video">Vídeo</option>
                                <option value="prova">Prova</option>
                                <option value="portfolio">Portfólio</option>
                                <option value="projeto">Projeto de Extensão</option>
                                <option value="evento">Evento</option>
                            </select>
                        </div>
                        <div style={{ marginRight: '15px' }}>
                            <input
                                type="date"
                                name="data"
                                value={cadastro.data}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <button type='submit'>Gravar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form
