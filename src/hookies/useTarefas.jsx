import React, { createContext, useContext, useState, useEffect } from 'react';
import ListarTarefas from './ListarTarefas';

const TarefasContext = createContext();

export const TarefasProvider = ({ children }) => {
    const [tarefas, setTarefas] = useState({ video: [], prova: [], portfolio: [], projeto: [], evento: [] });

    const atualizarTarefas = () => {
        ListarTarefas()
            .then((dados) => setTarefas(dados))
            .catch((error) => console.log(error.message));
    };

    useEffect(() => {
        atualizarTarefas();
    }, []);

    return (
        <TarefasContext.Provider value={{ tarefas, atualizarTarefas }}>
            {children}
        </TarefasContext.Provider>
    );
};

export const useTarefas = () => {
    return useContext(TarefasContext);
};
