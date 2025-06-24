import './detalhesEmpresa.css';
import { useState, useEffect } from 'react';
import { alteraStatus, listarComentarios, cadastrarComentario, deletarAnotacao } from "./detalhesEmpresa.service.js";
import { atualizarAnotacoes } from "./detalhesEmpresa.service.js";
import HeaderDetalhesEmpresa from './header/headerDetalhesEmpresa.jsx';
import { notificarSucesso, notificarErro } from '../../../utils/notificacao.js';
import Comenatario from './comentario/comentario.jsx';

export default function DetalhesEmpresa({ aberto, onClose, empresa, atualizarEmpresa }) {
  const [loading, setLoading] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [novoComentario, setNovoComentario] = useState('');

  const handleToggleVisitado = async () => {
    setLoading(true);
    try {
      const updatedEmpresa = await alteraStatus(empresa.id);
      atualizarEmpresa(updatedEmpresa);
      notificarSucesso("Status empresa atualizada com sucesso !")
    } catch (err) {
      console.error('Erro ao alterar status da empresa: ', err);
      notificarErro("Problema na atualização do status !")
    } finally {
      setLoading(false);
    }
  };

  const handleSalvarAnotacoes = async (comentario) => {
    try {
      const anotacaoAtualizada = await atualizarAnotacoes(comentario.id, comentario);
      const anotacoesAtualizadas = comentarios.map(emp =>
        emp.id === anotacaoAtualizada.id ? anotacaoAtualizada : emp
      );
      setComentarios(anotacoesAtualizadas);
    } catch (err) {
      console.error("Erro ao salvar anotações: ", err);
      notificarErro("Problema na atualização do comentário.")
    }
  };

  const handleDeletarAnotacao = async (idComentario) => {
    try {
      await deletarAnotacao(idComentario);
      const anotacoesAtualizadas = comentarios.filter(com => com.id !== idComentario);
      setComentarios(anotacoesAtualizadas);
    } catch (err) {
      console.error("Erro ao deletar anotações: ", err);
      notificarErro("Problema na deleção de comentários.");
    }
  }

  async function salvarComentario(novoComentario) {
    try {
      const comentarioNovo = { empresaDto: empresa, conteudo: novoComentario }

      const comentarioCriado = await cadastrarComentario(comentarioNovo);
      setComentarios([...comentarios, comentarioCriado]);
      setModalAberto(false);
      setNovoComentario('');
      notificarSucesso('Comentário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar comentário:', error);
      notificarErro('Erro ao cadastrar comentário.');
    }
  }

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const comentariosEmpresa = await listarComentarios(empresa.id);
        setComentarios(comentariosEmpresa);
      } catch (error) {
        console.error('Erro ao buscar comentários:', error);
        notificarErro('Erro ao carregar comentários.');
      }
    };

    if (empresa) {
      fetchComentarios();
    }
  }, [empresa]);


  if (!empresa) return null;

  const enderecoFormatado = `${empresa.endereco?.logradouro}, ${empresa.endereco?.numero}, ${empresa.endereco?.municipio} - ${empresa.endereco?.uf}`;

  return (
    <div className={`detail-view ${aberto ? "active" : ""}`} id="detail-view">
      <HeaderDetalhesEmpresa onClose={onClose} />
      <div className="detail-content">
        <h3 className="detail-title">
          {empresa.nomeFantasia?.trim() ? empresa.nomeFantasia : empresa.razaoSocial}
        </h3>
        <span className="detail-segment">{empresa.segmentoDescricao}</span>
        <div className="detail-status">
          <div className="status-label">
            <div className={`status-indicator ${empresa.visitado ? "visited" : "not-visited"}`} />
            <span>{empresa.visitado ? "Visitado" : "Não visitado"}</span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={empresa.visitado}
              onChange={handleToggleVisitado}
              disabled={loading}
            />
            <span className="slider round" />
          </label>
        </div>
        <div className="detail-info">
          <p><i className="fas fa-map-marker-alt" style={{ color: "var(--primary-color)" }} /> <span>{enderecoFormatado}</span></p>
          <p><i className="fas fa-phone" style={{ color: "var(--primary-color)" }} /> <span>{empresa.telefone}</span></p>
          <p><i className="fas fa-user" style={{ color: "var(--primary-color)" }} /> <span>{empresa.razaoSocial}</span></p>
        </div>
        <div className="detail-actions">
          <button
            className="btn btn-primary btn-block"
            onClick={handleToggleVisitado}
            disabled={loading}
          >
            <i className={`fas ${empresa.visitado ? "fa-times-circle" : "fa-check-circle"}`} />
            {empresa.visitado ? " Marcar como não visitado" : " Marcar como visitado"}
          </button>
        </div>
        <div className="comentarios-section">
          <h3>Comentários</h3>
          {comentarios.map(com => {
            return (
              <Comenatario
                key={com.id}
                comentario={com}
                salvarComentario={handleSalvarAnotacoes}
                deletarComentario={handleDeletarAnotacao}
              />
            );
          })}

          <button className='btn-cadastrar-comentario' onClick={() => setModalAberto(true)}>Cadastrar</button>

        </div>

        {modalAberto && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Novo Comentário</h2>
              <textarea
                className="modal-textarea"
                value={novoComentario}
                onChange={(e) => setNovoComentario(e.target.value)}
                placeholder="Digite seu comentário aqui..."
              />
              <div className="modal-buttons">
                <button
                  className="modal-button modal-button-cancelar"
                  onClick={() => {
                    setModalAberto(false);
                    setNovoComentario('');
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="modal-button modal-button-salvar"
                  onClick={() => salvarComentario(novoComentario)}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}