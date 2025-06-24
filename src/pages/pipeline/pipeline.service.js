import api from '../../utils/axios';

export function listarQuadrosRepresentantes(id) {
    return api.get(`/quadros/${id}`)
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar empresas:", err);
            return []; 
        });
}

export function listarEmpresasRepresentante(id) {
    return api.get(`/empresas/${id}`)
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar empresas:", err);
            return []; 
        });
}

export function cadastrarNovoQuadro(novoQuadro) {
    return api.post(`/quadros`, novoQuadro)
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao cadastrar novo quadro:", err);
            return []; 
        });
}

export function atualizarQuadroEmpresa(id, novoQuadro) {
    return api.patch(`/empresas/${id}`, novoQuadro)
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao atualizar quadro da empresa:", err);
            return []; 
        });
}