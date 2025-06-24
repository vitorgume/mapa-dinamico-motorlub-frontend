import BottomNavigate from '../../components/layout/bottomNavigate/bottomNavigate';
import HeaderMapa from '../../components/layout/headerMapa/headerMapa';
import Quadro from '../../components/layout/quadro/quadro';
import './pipeline.css';
import { useEffect, useState } from 'react';
import { atualizarQuadroEmpresa, cadastrarNovoQuadro, listarEmpresasRepresentante, listarQuadrosRepresentantes as listarQuadrosRepresentante } from './pipeline.service';
import ModalDelete from '../../components/layout/modalDeleteQuadro/modalDelete';
import { CircularProgress } from '@mui/material';

export default function Pipeline() {
    const [empresas, setEmpresas] = useState([]);
    const [quadros, setQuadros] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [nomeNovoQuadro, setNomeNovoQuadro] = useState('');
    const [idRepresentante, setIdRepresentante] = useState('');
    const [carregando, setCarregando] = useState(true);

    const handleDrop = async (e, etapa) => {
        const id = e.dataTransfer.getData('id');
        const quadroDestino = quadros.find(q => q.id === etapa.id);
    
        if (!quadroDestino) return;
    
        try {
            const empresaAtualizada = await atualizarQuadroEmpresa(id, quadroDestino);
            
            const updatedEmpresas = empresas.map(emp => {
                if (emp.id === empresaAtualizada.id) {
                    return empresaAtualizada;
                }
                return emp;
            });
    
            setEmpresas(updatedEmpresas);
        } catch (err) {
            console.error('Erro ao atualizar quadro da empresa no backend', err);
        }
    };    

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('id', id);
    };

    const abrirModal = () => setModalAberto(true);

    const fecharModal = () => {
        setModalAberto(false);
        setNomeNovoQuadro('');
    };

    const criarQuadro = async () => {
        if (nomeNovoQuadro.trim() === '') return;

        const novoQuadro = {
            titulo: nomeNovoQuadro,
            representante: { id: idRepresentante }
        };

        try {
            const quadroSalvo = await cadastrarNovoQuadro(novoQuadro);
            setQuadros([...quadros, quadroSalvo]);
            fecharModal();
        } catch (err) {
            console.error("Erro ao carregar empresas:", error);
        }
    };

    useEffect(() => {
        setIdRepresentante(localStorage.getItem('id-representante'));

        async function carregarQuadros(idRep) {
            setCarregando(true);
            const quadros = await listarQuadrosRepresentante(idRep);
            setQuadros(quadros);
        }

        async function carregarEmpresas(idRep) {
            const empresas = await listarEmpresasRepresentante(idRep);
            setEmpresas(empresas);
            setCarregando(false);
        }

        if (idRepresentante) {
            carregarQuadros(idRepresentante);
            carregarEmpresas(idRepresentante);
        }
    }, [idRepresentante]);

    return (
        <div className='pipeline'>
            <HeaderMapa />

            {carregando ? (
                <div className="loading-container">
                    <CircularProgress size={60} thickness={4} />
                    <p className="loading-text">Carregando empresas...</p>
                </div>
            ) : (
                <div className="pipeline-container">
                    {quadros.map(quadro => (
                        <Quadro
                            key={quadro.id}
                            etapa={quadro}
                            handleDragStart={handleDragStart}
                            handleDrop={handleDrop}
                            empresas={empresas}
                        />
                    ))}
                    <button className='botao-novo-quadro' onClick={abrirModal}>
                        <i className="fas fa-plus"></i> Novo Quadro
                    </button>
                </div>
            )}

            <BottomNavigate />

            {modalAberto && (
                <ModalDelete
                    criarQuadro={criarQuadro}
                    fecharModal={fecharModal}
                    setNomeNovoQuadro={setNomeNovoQuadro}
                    nomeNovoQuadro={nomeNovoQuadro}
                />
            )}
        </div>
    );
}
