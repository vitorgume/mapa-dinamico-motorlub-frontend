import { formatarData } from '../../../../utils/data';
import DeleteImage from '../../../../assets/delete_7022659 1.png';
import './comentario.css';
import { useEffect, useState } from 'react';
import ModalDelete from '../modalDelete/modalDelete';

export default function Comentario({ comentario, salvarComentario, deletarComentario }) {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [textoComentario, setTextoComentario] = useState('');
    const [textoTemporario, setTextoTemporario] = useState('');

    const ativarEdicao = () => {
        setTextoTemporario(textoComentario);
        setModoEdicao(true);
    };

    const cancelarEdicao = () => {
        setModoEdicao(false);
    };

    const salvarEdicao = () => {
        comentario.conteudo = textoTemporario;
        salvarComentario(comentario);
        setTextoComentario(textoTemporario);
        setModoEdicao(false);
    };

    const handleChange = (e) => {
        setTextoTemporario(e.target.value);
    };

    const handleOpenDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleDelete = async () => {
        deletarComentario(comentario.id);
    };

    useEffect(() => {
        setTextoComentario(comentario.conteudo);
    }, [comentario]);

    return (
        <div className='comentario-container'>
            <div className='header-comentario'>
                <h2>{formatarData(comentario.dataCriacao)}</h2>
                <button onClick={handleOpenDeleteModal}><img src={DeleteImage} alt="Deleção do comentário" /></button>
            </div>


            <textarea
                value={modoEdicao ? textoTemporario : textoComentario}
                onChange={handleChange}
                disabled={!modoEdicao}
                className={modoEdicao ? 'editando' : ''}
            />

            <div className='botoes-container'>
                {modoEdicao ? (
                    <>
                        <button onClick={salvarEdicao} className='botao-salvar'>Salvar</button>
                        <button onClick={cancelarEdicao} className='botao-cancelar'>Cancelar</button>
                    </>
                ) : (
                    <button onClick={ativarEdicao}>Editar</button>
                )}
            </div>

            <ModalDelete
                isOpen={showDeleteModal}
                onClose={handleCloseDeleteModal}
                onConfirm={handleDelete}
            />
        </div>
    );
}