import React, { useEffect, useState } from 'react';
import './DashSide.css';

const DashSide = ({ dashData }) => {

    return (
        <div className="dash-container" style={{ padding: '20px' }}>
            {(
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                        <b>Aprovado:</b>
                        <span className="badge bg-success" style={{ marginLeft: '10px', fontSize: '1rem' }}>
                            {dashData.aprovado}
                        </span>
                    </div>
                    <div>
                        <b>Cursando/Falta:</b>
                        <span className="badge bg-primary" style={{ marginLeft: '10px', fontSize: '1rem' }}>
                            {dashData.falta_cursar}
                        </span>
                    </div>
                    <div>
                        <b>Reprovado:</b>
                        <span className="badge bg-danger" style={{ marginLeft: '10px', fontSize: '1rem' }}>
                            {dashData.reprovado}
                        </span>
                    </div>
                    <div>
                        <b>Total de Matérias:</b><br />
                        <span className="badge bg-dark" style={{ marginLeft: '10px', fontSize: '1rem' }}>
                            {dashData.total}
                        </span>
                    </div>
                    <div>
                        <b>Por cento aprovado:</b>
                        <span className="badge bg-info" style={{ marginLeft: '10px', fontSize: '1rem' }}>
                            {dashData.porcentagem_aprovado}%
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashSide;
