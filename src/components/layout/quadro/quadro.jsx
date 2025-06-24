import { useEffect, useState } from 'react';
import './quadro.css';

export default function Quadro({etapa, handleDragStart, handleDrop, empresas}) {
    const [empresasFiltradas, setEmpresasFiltradas] = useState([]);

    useEffect(() => {
    const filtradas = empresas.filter(emp => emp.quadroDto.id === etapa.id);
    setEmpresasFiltradas(filtradas);
}, [empresas, etapa]);

    return (
        <div
            key={etapa}
            className="pipeline-column"
            onDrop={(e) => handleDrop(e, etapa)}
            onDragOver={(e) => e.preventDefault()}
        >
            <h2 className="pipeline-header">{etapa.titulo}</h2>
            <div className="pipeline-content">
                {empresasFiltradas
                    .map(emp => (
                        <div
                            key={emp.id}
                            className="pipeline-card"
                            draggable
                            onDragStart={(e) => handleDragStart(e, emp.id)}
                        >
                            <strong>{emp.nomeFantasia || emp.razaoSocial || 'Nome não informado'}</strong>
                        </div>
                    ))}
            </div>
        </div>
    );
}