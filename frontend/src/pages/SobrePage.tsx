import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Endpoint {
  metodo: 'GET' | 'POST' | 'PUT' | 'DELETE'
  rota: string
  descricao: string
}

const endpoints: Endpoint[] = [
  { metodo: 'GET', rota: '/api/filmes', descricao: 'Lista todos os filmes' },
  { metodo: 'POST', rota: '/api/filmes', descricao: 'Cadastra um novo filme' },
  { metodo: 'PUT', rota: '/api/filmes/:id', descricao: 'Atualiza um filme existente' },
  { metodo: 'DELETE', rota: '/api/filmes/:id', descricao: 'Remove um filme' },
]

const tecnologias: string[] = ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'React Router']

export function SobrePage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sobre o projeto</h1>
        <p className="text-muted-foreground text-sm">
          Interface SPA que consome a API RESTful do catálogo de filmes (AT1).
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Endpoints consumidos</CardTitle>
          <CardDescription>Operações de CRUD disponíveis na interface.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {endpoints.map((e) => (
            <div key={`${e.metodo}${e.rota}`} className="flex flex-wrap items-center gap-3 text-sm">
              <Badge variant={e.metodo === 'DELETE' ? 'destructive' : 'default'}>{e.metodo}</Badge>
              <code className="bg-muted rounded px-2 py-0.5">{e.rota}</code>
              <span className="text-muted-foreground">{e.descricao}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tecnologias</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {tecnologias.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}