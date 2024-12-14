import React, { useEffect } from 'react';
import './Home.css';
import Avaliacoes from './categories/Avaliacoes';
import Portfolio from './categories/Portfolio';
import Video from './categories/Video';
import Prova from './categories/Prova';
import Projeto from './categories/Projeto';
import Evento from './categories/Evento';
import Form from './controllers/form';

const Home = () => {


    return (
        <div className='Home'>
                <div className='main-container'>
                    <div className='main-container2'>
                        <Avaliacoes />
                    </div>
                    <div className='main-container1'>
                        <Form />
                    </div>
                    <div className='main-container2'>
                        <Portfolio />
                    </div>
                </div>

                <div className='second-container'>
                    <div className='second-container1'>
                        <Video />
                    </div>
                    <div className='second-container1'>
                        <Prova />
                    </div>
                    <div className='second-container1'>
                        <Projeto />
                    </div>
                    <div className='second-container1'>
                        <Evento />
                    </div>
                </div>
        </div>
    );
};

export default Home;
