import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type { Filme, FilmeFormValues, FilmePayload } from '@/types/filme'

const ANO_MINIMO = 1888
const ANO_MAXIMO = new Date().getFullYear() + 5

type CampoValidavel = 'titulo' | 'genero' | 'ano_lancamento' | 'nota'
type FormErrors = Partial<Record<CampoValidavel, string>>

const VALORES_INICIAIS: FilmeFormValues = {
  titulo: '',
  genero: '',
  ano_lancamento: '',
  nota: '',
  disponibilidade_plataforma: true,
}

function validar(values: FilmeFormValues): FormErrors {
  const errors: FormErrors = {}
  const ano = Number(values.ano_lancamento)
  const nota = Number(values.nota)

  if (values.titulo.trim() === '') errors.titulo = 'Informe o título do filme.'
  if (values.genero.trim() === '') errors.genero = 'Informe o gênero.'

  if (values.ano_lancamento === '' || !Number.isInteger(ano) || ano < ANO_MINIMO || ano > ANO_MAXIMO) {
    errors.ano_lancamento = `Informe um ano entre ${ANO_MINIMO} e ${ANO_MAXIMO}.`
  }
  if (values.nota === '' || Number.isNaN(nota) || nota < 0 || nota > 10) {
    errors.nota = 'A nota deve ser um número entre 0 e 10.'
  }
  return errors
}

function valoresDoFilme(filme: Filme | null): FilmeFormValues {
  if (!filme) return VALORES_INICIAIS
  return {
    titulo: filme.titulo,
    genero: filme.genero,
    ano_lancamento: String(filme.ano_lancamento),
    nota: String(filme.nota),
    disponibilidade_plataforma: filme.disponibilidade_plataforma,
  }
}

interface FilmeFormProps {
  filme: Filme | null
  onSubmit: (payload: FilmePayload) => Promise<boolean>
  onClose: () => void
}

function FilmeForm({ filme, onSubmit, onClose }: FilmeFormProps) {
  const [values, setValues] = useState<FilmeFormValues>(() => valoresDoFilme(filme))
  const [errors, setErrors] = useState<FormErrors>({})
  const [saving, setSaving] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((atual) => ({ ...atual, [name]: value }))
    setErrors((atual) => ({ ...atual, [name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const encontrados = validar(values)
    setErrors(encontrados)
    if (Object.keys(encontrados).length > 0) return

    setSaving(true)
    const sucesso = await onSubmit({
      titulo: values.titulo.trim(),
      genero: values.genero.trim(),
      ano_lancamento: Number(values.ano_lancamento),
      nota: Math.round(Number(values.nota) * 10) / 10,
      disponibilidade_plataforma: values.disponibilidade_plataforma,
    })
    setSaving(false)

    if (sucesso) onClose()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="titulo">Título</Label>
        <Input
          id="titulo"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
          placeholder="Ex.: Interestelar"
          maxLength={150}
          aria-invalid={Boolean(errors.titulo)}
        />
        {errors.titulo && <p className="text-destructive text-sm">{errors.titulo}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="genero">Gênero</Label>
        <Input
          id="genero"
          name="genero"
          value={values.genero}
          onChange={handleChange}
          placeholder="Ex.: Ficção Científica"
          maxLength={50}
          aria-invalid={Boolean(errors.genero)}
        />
        {errors.genero && <p className="text-destructive text-sm">{errors.genero}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="ano_lancamento">Ano de lançamento</Label>
          <Input
            id="ano_lancamento"
            name="ano_lancamento"
            type="number"
            value={values.ano_lancamento}
            onChange={handleChange}
            placeholder="2014"
            aria-invalid={Boolean(errors.ano_lancamento)}
          />
          {errors.ano_lancamento && (
            <p className="text-destructive text-sm">{errors.ano_lancamento}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="nota">Nota (0 a 10)</Label>
          <Input
            id="nota"
            name="nota"
            type="number"
            step="0.1"
            min={0}
            max={10}
            value={values.nota}
            onChange={handleChange}
            placeholder="8.5"
            aria-invalid={Boolean(errors.nota)}
          />
          {errors.nota && <p className="text-destructive text-sm">{errors.nota}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Switch
          id="disponibilidade_plataforma"
          checked={values.disponibilidade_plataforma}
          onCheckedChange={(checked: boolean) =>
            setValues((atual) => ({ ...atual, disponibilidade_plataforma: checked }))
          }
        />
        <Label htmlFor="disponibilidade_plataforma">Disponível na plataforma</Label>
      </div>

      <DialogFooter className="mt-2">
        <Button type="button" variant="outline" onClick={onClose} disabled={saving}>
          Cancelar
        </Button>
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="size-4 animate-spin" />}
          {filme ? 'Salvar alterações' : 'Cadastrar filme'}
        </Button>
      </DialogFooter>
    </form>
  )
}

interface FilmeFormDialogProps {
  open: boolean
  filme: Filme | null
  onOpenChange: (open: boolean) => void
  onSubmit: (payload: FilmePayload) => Promise<boolean>
}

export function FilmeFormDialog({ open, filme, onOpenChange, onSubmit }: FilmeFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{filme ? 'Editar filme' : 'Novo filme'}</DialogTitle>
          <DialogDescription>
            {filme
              ? 'Altere os dados do filme e salve para atualizar o catálogo.'
              : 'Preencha os dados para adicionar um filme ao catálogo.'}
          </DialogDescription>
        </DialogHeader>
        <FilmeForm filme={filme} onSubmit={onSubmit} onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}