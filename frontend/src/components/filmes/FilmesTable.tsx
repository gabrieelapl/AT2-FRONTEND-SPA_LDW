import { Pencil, Star, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Filme } from '@/types/filme'

interface FilmesTableProps {
  filmes: Filme[]
  loading: boolean
  onEdit: (filme: Filme) => void
  onDelete: (filme: Filme) => void
}

const LINHAS_SKELETON = 5

export function FilmesTable({ filmes, loading, onEdit, onDelete }: FilmesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Gênero</TableHead>
          <TableHead>Ano</TableHead>
          <TableHead>Nota</TableHead>
          <TableHead>Plataforma</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          ? Array.from({ length: LINHAS_SKELETON }, (_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 6 }, (_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : filmes.map((filme) => (
              <TableRow key={filme.id}>
                <TableCell className="font-medium">{filme.titulo}</TableCell>
                <TableCell>
                  <Badge variant="outline">{filme.genero}</Badge>
                </TableCell>
                <TableCell>{filme.ano_lancamento}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-1">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                    {filme.nota.toFixed(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={filme.disponibilidade_plataforma ? 'default' : 'secondary'}>
                    {filme.disponibilidade_plataforma ? 'Disponível' : 'Indisponível'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label={`Editar ${filme.titulo}`}
                      onClick={() => onEdit(filme)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      aria-label={`Excluir ${filme.titulo}`}
                      onClick={() => onDelete(filme)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  )
}