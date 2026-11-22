import { request } from '@/lib/api'
import type { Filme, FilmeApi, FilmePayload } from '@/types/filme'

const ENDPOINT = '/api/filmes'

function normalizar(filme: FilmeApi): Filme {
  return { ...filme, nota: Number(filme.nota) }
}

export const filmeService = {
  async listar(): Promise<Filme[]> {
    const filmes = await request<FilmeApi[]>(ENDPOINT)
    return filmes.map(normalizar)
  },

  async criar(payload: FilmePayload): Promise<Filme> {
    const filme = await request<FilmeApi>(ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return normalizar(filme)
  },

  async atualizar(id: number, payload: FilmePayload): Promise<Filme> {
    const filme = await request<FilmeApi>(`${ENDPOINT}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
    return normalizar(filme)
  },

  async excluir(id: number): Promise<void> {
    await request<void>(`${ENDPOINT}/${id}`, { method: 'DELETE' })
  },
}