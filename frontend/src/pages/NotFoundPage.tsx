import { Link } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <p className="text-muted-foreground text-6xl font-bold">404</p>
      <h1 className="text-2xl font-bold">Página não encontrada</h1>
      <p className="text-muted-foreground text-sm">O endereço acessado não existe nesta aplicação.</p>
      <Link to="/" className={buttonVariants()}>
        Voltar ao catálogo
      </Link>
    </div>
  )
}