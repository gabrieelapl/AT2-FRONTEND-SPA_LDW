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
import type { Filme } from '@/types/filme'

interface FilmeDeleteDialogProps {
  filme: Filme | null
  onOpenChange: (open: boolean) => void
  onConfirm: (filme: Filme) => Promise<boolean>
}

export function FilmeDeleteDialog({ filme, onOpenChange, onConfirm }: FilmeDeleteDialogProps) {
  const [removendo, setRemovendo] = useState<boolean>(false)

  const handleConfirm = async () => {
    if (!filme) return
    setRemovendo(true)
    const sucesso = await onConfirm(filme)
    setRemovendo(false)
    if (sucesso) onOpenChange(false)
  }

  return (
    <Dialog open={filme !== null} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir filme</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir <strong>{filme?.titulo}</strong>? Esta ação não pode ser
            desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={removendo}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={removendo}>
            {removendo && <Loader2 className="size-4 animate-spin" />}
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}