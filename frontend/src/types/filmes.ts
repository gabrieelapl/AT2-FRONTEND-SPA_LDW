export interface Filme {
  id: number
  titulo: string
  genero: string
  ano_lancamento: number
  nota: number
  disponibilidade_plataforma: boolean
  createdAt: string
  updatedAt?: string
}

export interface FilmeApi extends Omit<Filme, 'nota'> {
  nota: number | string
}

export type FilmePayload = Pick<
  Filme,
  'titulo' | 'genero' | 'ano_lancamento' | 'nota' | 'disponibilidade_plataforma'
>

export interface FilmeFormValues {
  titulo: string
  genero: string
  ano_lancamento: string
  nota: string
  disponibilidade_plataforma: boolean
}

export interface ApiErrorBody {
  erro?: string
  detalhe?: string
}