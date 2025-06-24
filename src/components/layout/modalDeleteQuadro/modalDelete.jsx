import './modalDelete.css';

export default function ModalDelete({criarQuadro, fecharModal, setNomeNovoQuadro, nomeNovoQuadro}) {


    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Criar Novo Quadro</h3>
                <input
                    type="text"
                    placeholder="Nome do quadro"
                    value={nomeNovoQuadro}
                    onChange={(e) => setNomeNovoQuadro(e.target.value)}
                />
                <div className="modal-buttons">
                    <button onClick={criarQuadro} className='botao-salvar'>Criar</button>
                    <button onClick={fecharModal} className='botao-cancelar'>Cancelar</button>
                </div>
            </div>
        </div>
    );
}