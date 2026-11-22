import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/api'
import { filmeService } from '@/services/filmeService'
import type { Filme, FilmePayload } from '@/types/filme'

const ordenarPorMaisRecente = (lista: Filme[]): Filme[] => [...lista].sort((a, b) => b.id - a.id)

export function useFilmes() {
  const [filmes, setFilmes] = useState<Filme[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const carregar = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const dados = await filmeService.listar()
      setFilmes(ordenarPorMaisRecente(dados))
    } catch (err) {
      const mensagem = getErrorMessage(err)
      setError(mensagem)
      toast.error('Falha ao carregar os filmes', { description: mensagem })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void carregar()
  }, [carregar])

  const criar = useCallback(async (payload: FilmePayload): Promise<boolean> => {
    try {
      const novo = await filmeService.criar(payload)
      setFilmes((atual) => ordenarPorMaisRecente([novo, ...atual]))
      toast.success('Filme cadastrado com sucesso!', {
        description: `"${novo.titulo}" foi adicionado ao catálogo.`,
      })
      return true
    } catch (err) {
      toast.error('Não foi possível cadastrar o filme', { description: getErrorMessage(err) })
      return false
    }
  }, [])

  const atualizar = useCallback(async (id: number, payload: FilmePayload): Promise<boolean> => {
    try {
      const atualizado = await filmeService.atualizar(id, payload)
      setFilmes((atual) => atual.map((f) => (f.id === id ? atualizado : f)))
      toast.success('Filme atualizado com sucesso!', {
        description: `As alterações em "${atualizado.titulo}" foram salvas.`,
      })
      return true
    } catch (err) {
      toast.error('Não foi possível atualizar o filme', { description: getErrorMessage(err) })
      return false
    }
  }, [])

  const excluir = useCallback(async (filme: Filme): Promise<boolean> => {
    try {
      await filmeService.excluir(filme.id)
      setFilmes((atual) => atual.filter((f) => f.id !== filme.id))
      toast.success('Filme excluído com sucesso!', {
        description: `"${filme.titulo}" foi removido do catálogo.`,
      })
      return true
    } catch (err) {
      toast.error('Não foi possível excluir o filme', { description: getErrorMessage(err) })
      return false
    }
  }, [])

  return { filmes, loading, error, recarregar: carregar, criar, atualizar, excluir }
}