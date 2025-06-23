import './comentario.css';
import { useEffect, useState } from 'react';

export default function Comentario({comentario, salvarComentario}) {


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
        setTextoComentario(textoTemporario);
        comentario.conteudo = textoComentario;
        salvarComentario(comentario);
        setModoEdicao(false);
    };

    const handleChange = (e) => {
        setTextoTemporario(e.target.value);
    };

    useEffect(() => {
        setTextoComentario(comentario.conteudo);
    }, [comentario]);

    return (
        <div className='comentario-container'>
            <h2>{comentario.dataCriacao}</h2>

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
        </div>
    );
}