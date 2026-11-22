import { AlertCircle, Plus, RefreshCw, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { EmptyState } from '@/components/filmes/EmptyState'
import { FilmeDeleteDialog } from '@/components/filmes/FilmeDeleteDialog'
import { FilmeFormDialog } from '@/components/filmes/FilmeFormDialog'
import { FilmesTable } from '@/components/filmes/FilmesTable'
import { StatsCards } from '@/components/filmes/StatsCards'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useFilmes } from '@/hooks/useFilmes'
import type { Filme, FilmePayload } from '@/types/filme'

export function FilmesPage() {
  const { filmes, loading, error, recarregar, criar, atualizar, excluir } = useFilmes()

  const [busca, setBusca] = useState<string>('')
  const [formAberto, setFormAberto] = useState<boolean>(false)
  const [filmeEmEdicao, setFilmeEmEdicao] = useState<Filme | null>(null)
  const [filmeParaExcluir, setFilmeParaExcluir] = useState<Filme | null>(null)

  const filmesFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    if (termo === '') return filmes
    return filmes.filter(
      (f) => f.titulo.toLowerCase().includes(termo) || f.genero.toLowerCase().includes(termo),
    )
  }, [filmes, busca])

  const abrirNovo = () => {
    setFilmeEmEdicao(null)
    setFormAberto(true)
  }

  const abrirEdicao = (filme: Filme) => {
    setFilmeEmEdicao(filme)
    setFormAberto(true)
  }

  const salvar = (payload: FilmePayload): Promise<boolean> =>
    filmeEmEdicao ? atualizar(filmeEmEdicao.id, payload) : criar(payload)

  const mostrarErro = !loading && error !== null
  const mostrarVazio = !loading && error === null && filmesFiltrados.length === 0
  const mostrarTabela = loading || (error === null && filmesFiltrados.length > 0)

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Catálogo de Filmes</h1>
          <p className="text-muted-foreground text-sm">
            Gerencie o acervo conectado à sua API RESTful.
          </p>
        </div>
        <Button onClick={abrirNovo}>
          <Plus className="size-4" />
          Novo filme
        </Button>
      </div>

      <StatsCards filmes={filmes} loading={loading} />

      <Card>
        <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid gap-1.5">
            <CardTitle>Filmes cadastrados</CardTitle>
            <CardDescription>
              {loading ? 'Carregando...' : `${filmesFiltrados.length} de ${filmes.length} registro(s)`}
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="text-muted-foreground absolute top-2.5 left-3 size-4" />
            <Input
              value={busca}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusca(e.target.value)}
              placeholder="Buscar por título ou gênero"
              aria-label="Buscar filmes"
              className="pl-9"
            />
          </div>
        </CardHeader>

        <CardContent>
          {mostrarErro && (
            <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
              <AlertCircle className="text-destructive size-8" aria-hidden="true" />
              <h3 className="text-lg font-semibold">Não foi possível carregar os dados</h3>
              <p className="text-muted-foreground max-w-sm text-sm">{error}</p>
              <Button variant="outline" onClick={() => void recarregar()}>
                <RefreshCw className="size-4" />
                Tentar novamente
              </Button>
            </div>
          )}

          {mostrarVazio && (
            <EmptyState semResultadosNaBusca={filmes.length > 0} onCreate={abrirNovo} />
          )}

          {mostrarTabela && (
            <FilmesTable
              filmes={filmesFiltrados}
              loading={loading}
              onEdit={abrirEdicao}
              onDelete={setFilmeParaExcluir}
            />
          )}
        </CardContent>
      </Card>

      <FilmeFormDialog
        open={formAberto}
        filme={filmeEmEdicao}
        onOpenChange={setFormAberto}
        onSubmit={salvar}
      />

      <FilmeDeleteDialog
        filme={filmeParaExcluir}
        onOpenChange={(aberto: boolean) => {
          if (!aberto) setFilmeParaExcluir(null)
        }}
        onConfirm={excluir}
      />
    </div>
  )
}