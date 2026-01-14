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
import { BotIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { generateAiReport } from "@/actions/generate-ai-button";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

interface AiReportButtonProps {
  month: string;
}

export default function AiReportButton({ month }: AiReportButtonProps) {
  const [report, setReport] = useState<string | null>(null);
  const { executeAsync: executeGenerateAiReport, isPending: reportIsLoading } =
    useAction(generateAiReport);

  const handleGenerateReportClick = async () => {
    const result = await executeGenerateAiReport({ month });
    if (result.validationErrors) {
      return toast.error(result.validationErrors._errors?.[0]);
    }
    if (result.serverError) {
      return toast.error("Erro ao gerar relatório");
    }
    if (result.data) {
      setReport(result.data);
    }
  };
  return (
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
          <DialogTitle>Relatório IA</DialogTitle>
          <DialogDescription>
            Use inteligência artificial para gerar um relatório com insights
            sobre suas finanças.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="prose prose-h3:text-white prose-h4:text-white prose-strong:text-white max-h-[450px] text-white">
          <ReactMarkdown>{report}</ReactMarkdown>
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
  );
}
