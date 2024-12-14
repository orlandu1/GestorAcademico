import React, { useState, useEffect } from 'react';
import './Discipline.css';
import TableDiscipline from './controllers/Table/TableDiscipline';
import fetchDisciplinas from '../../hookies/ListarDisciplinas';
import DashSide from './DashSide/DashSide';
import DashSideQuery from '../../hookies/DashSideQuery'; 

const Discipline = () => {
  const [semestre, setSemestre] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [disciplinas, setDisciplinas] = useState([]);
  const [dashData, setDashData] = useState({});

  const loadDisciplinas = async () => {
    try {
      const data = await fetchDisciplinas();
      setDisciplinas(data);

      const dashData = await DashSideQuery();
      setDashData(dashData);
    } catch (error) {
      console.error("Erro ao carregar as disciplinas:", error);
    }
  };

  useEffect(() => {
    loadDisciplinas();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
   
    let data = {
      semestre: semestre,
      disciplina: disciplina,
      situacao: 0
    };

    if (!semestre.trim() || !disciplina.trim()) {
      alert('Preencha todos os campos!');
      return;
    }

    fetch("/db/gravar_disciplina.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        setSemestre('');
        setDisciplina('');
        loadDisciplinas();
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados:", error);
      });
  };

  return (
    <div className='Discipline'>
      <div className='main-manage'>
        <div className='container-form'>
          <p>Acompanhamento de Disciplinas</p>
          <br />

          <form onSubmit={handleSubmit} className="form">
            <div className='input-semestre'>
              <label htmlFor="semestre">Semestre:</label>
              <input
                type="number"
                id="semestre"
                name="semestre"
                value={semestre}
                onChange={(e) => setSemestre(e.target.value)}
                required
                className="input"
                autoFocus
              />
            </div>
            <div className='input-disciplina'>
              <label htmlFor="disciplina">Disciplina:</label>
              <input
                type="text"
                id="disciplina"
                name="disciplina"
                value={disciplina}
                onChange={(e) => setDisciplina(e.target.value)}
                required
                className="input"
              />
            </div>
            <button type="submit" className="button">
              Cadastrar
            </button>
          </form>
        </div>
        <div>
          <br />
          <hr />
          <DashSide dashData={dashData} />
        </div>
      </div>
      <div className='main-data'>
        <div className='table-discipline'>
          <TableDiscipline disciplinas={disciplinas} loadDisciplinas={loadDisciplinas} />
        </div>
      </div>
    </div>
  );
};

export default Discipline;
