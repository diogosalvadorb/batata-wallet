"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BotIcon, Loader2Icon, SettingsIcon } from "lucide-react";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { generateAiReport } from "@/actions/generate-ai-button";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { ApiKeySettingsDialog } from "./api-key-settings-dialog";

interface AiReportButtonProps {
  month: string;
}

const OPENAI_API_KEY_STORAGE = "openai_api_key";

export default function AiReportButton({ month }: AiReportButtonProps) {
  const [report, setReport] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { executeAsync: executeGenerateAiReport, isPending: reportIsLoading } =
    useAction(generateAiReport);

  const handleGenerateReportClick = async () => {
    const storedApiKey = localStorage.getItem(OPENAI_API_KEY_STORAGE);
    const result = await executeGenerateAiReport({
      month,
      apiKey: storedApiKey || undefined,
    });
    if (result.validationErrors) {
      return toast.error(result.validationErrors._errors?.[0]);
    }
    if (result.serverError) {
      const errorMessage = result.serverError.trim().replace(/\n/g, " ");
      toast.error(errorMessage);
      if (
        errorMessage.includes("API key não configurada") ||
        errorMessage.includes("configure sua API key")
      ) {
        setIsSettingsOpen(true);
      }
      return;
    }
    if (result.data) {
      setReport(result.data);
    }
  };
  return (
    <>
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            setReport(null);
          }
        }}
      >
        <DialogTrigger asChild>
          <Button variant="primary">
            Relatório IA
            <BotIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Relatório IA
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSettingsOpen(true)}
                title="Configurar API Key"
                className="mr-8"
              >
                <SettingsIcon className="text-yellow-500" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Use inteligência artificial para gerar um relatório com insights
              sobre suas finanças.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="prose prose-h3:text-white prose-h4:text-white prose-strong:text-white max-h-[450px] text-white">
            {report ? (
              <ReactMarkdown>{report}</ReactMarkdown>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-muted-foreground">
                  Clique em "Gerar relatório" para gerar um relatório com
                  insights sobre suas finanças.
                </p>
              </div>
            )}
          </ScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancelar</Button>
            </DialogClose>
            <Button
              onClick={handleGenerateReportClick}
              disabled={reportIsLoading}
            >
              {reportIsLoading && <Loader2Icon className="animate-spin" />}
              Gerar relatório
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ApiKeySettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
      />
    </>
  );
}
