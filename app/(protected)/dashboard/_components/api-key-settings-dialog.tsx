"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface ApiKeySettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OPENAI_API_KEY_STORAGE = "openai_api_key";

export function ApiKeySettingsDialog({
  open,
  onOpenChange,
}: ApiKeySettingsDialogProps) {
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => {
    // Carrega a API key do localStorage
    const storedApiKey = localStorage.getItem(OPENAI_API_KEY_STORAGE);
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, [open]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem(OPENAI_API_KEY_STORAGE, apiKey.trim());
      toast.success("API key salva com sucesso!");
      onOpenChange(false);
    } else {
      localStorage.removeItem(OPENAI_API_KEY_STORAGE);
      toast.success("API key removida!");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurar API Key do OpenAI</DialogTitle>
          <DialogDescription>
            Configure sua API key do OpenAI para usar o relatório IA. A chave
            será armazenada apenas no seu navegador.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <p className="text-muted-foreground text-sm">
            Se você não tiver uma API key, pode obter uma em{" "}
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              platform.openai.com/api-keys
            </a>
          </p>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSaveApiKey}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
