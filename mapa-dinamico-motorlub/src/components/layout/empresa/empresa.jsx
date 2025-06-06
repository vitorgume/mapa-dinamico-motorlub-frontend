import './empresa.css';
import DetalhesEmpresa from '../detalhesEmpresa/detalhesEmpresa.jsx';


export default function Empresa({ empresa, atualizarEmpresa, empresaSelecionada, detalhesEmpresaAberto, setDetalhesEmpresaAberto, setEmpresaSelecionada }) {
    
    
    return (
        <div className="list-item">
            <div className={`list-item-indicator ${empresa.visitado ? 'visited' : 'not-visited'}`}></div>

            <div className="list-item-content">
                <div className="list-item-title">{empresa.nomeFantasia}</div>
                <div className="list-item-subtitle">{empresa.endereco?.logradouro || 'Endereço não informado'}</div>
                <div className="list-item-meta">
                    <span className="list-item-tag">{empresa.segmentoDescricao}</span>
                    <span>{empresa.endereco?.bairro || 'Sem bairro'}</span>
                </div>
            </div>

            <div className="list-item-actions">
                <button className="icon-button" style={{ color: "var(--primary-color)" }} onClick={() => {
                    setEmpresaSelecionada(empresa);
                    setDetalhesEmpresaAberto(true);
                }}>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>

            <DetalhesEmpresa
                aberto={detalhesEmpresaAberto}
                onClose={() => setDetalhesEmpresaAberto(false)}
                empresa={empresaSelecionada}
                atualizarEmpresa={atualizarEmpresa}
            />
        </div>
    );
}
