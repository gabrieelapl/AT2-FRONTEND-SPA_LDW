import { Clapperboard, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  semResultadosNaBusca: boolean
  onCreate: () => void
}

export function EmptyState({ semResultadosNaBusca, onCreate }: EmptyStateProps) {
  const Icone = semResultadosNaBusca ? SearchX : Clapperboard

  return (
    <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
      <div className="bg-muted rounded-full p-4">
        <Icone className="text-muted-foreground size-8" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold">
        {semResultadosNaBusca ? 'Nenhum filme encontrado' : 'Seu catálogo está vazio'}
      </h3>
      <p className="text-muted-foreground max-w-sm text-sm">
        {semResultadosNaBusca
          ? 'Tente buscar por outro título ou gênero.'
          : 'Ainda não há filmes cadastrados. Que tal adicionar o primeiro?'}
      </p>
      {!semResultadosNaBusca && <Button onClick={onCreate}>Cadastrar primeiro filme</Button>}
    </div>
  )
}