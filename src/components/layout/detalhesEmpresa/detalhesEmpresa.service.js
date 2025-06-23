import api from '../../../utils/axios';

export async function alteraStatus(id) {
  try {
    const response = await api.put(`empresas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar status da empresa:', error);
    throw error;
  }
}

export async function atualizarAnotacoes(id, comentario) {
  try {
    const response = await api.put(`comentarios/${id}`, {comentario: comentario});
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar comentários da empresa:', error);
    throw error;
  }
}

export async function listarComentarios(idEmpresa) {
  try {
    const response = await api.get(`comentarios/${idEmpresa}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar comentários da empresa:', error);
    throw error;
  }
}

export async function cadastrarComentario(novoComentario) {
  try {
    const response = await api.post(`comentarios`, novoComentario);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar comentário da empresa:', error);
    throw error;
  }
}
