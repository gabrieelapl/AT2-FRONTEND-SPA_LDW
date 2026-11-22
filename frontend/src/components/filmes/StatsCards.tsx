import { Film, MonitorPlay, Star, Tags } from 'lucide-react'
import type { ComponentType } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { Filme } from '@/types/filme'

interface StatsCardsProps {
  filmes: Filme[]
  loading: boolean
}

interface StatItem {
  titulo: string
  valor: string
  icone: ComponentType<{ className?: string }>
}

export function StatsCards({ filmes, loading }: StatsCardsProps) {
  const total = filmes.length
  const media = total > 0 ? filmes.reduce((soma, f) => soma + f.nota, 0) / total : 0
  const disponiveis = filmes.filter((f) => f.disponibilidade_plataforma).length
  const generos = new Set(filmes.map((f) => f.genero.trim().toLowerCase())).size

  const itens: StatItem[] = [
    { titulo: 'Total de filmes', valor: String(total), icone: Film },
    { titulo: 'Nota média', valor: total > 0 ? media.toFixed(1) : '—', icone: Star },
    { titulo: 'Disponíveis', valor: String(disponiveis), icone: MonitorPlay },
    { titulo: 'Gêneros', valor: String(generos), icone: Tags },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {itens.map(({ titulo, valor, icone: Icone }) => (
        <Card key={titulo} className="gap-2 py-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-muted-foreground text-sm font-medium">{titulo}</CardTitle>
            <Icone className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold">{valor}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}