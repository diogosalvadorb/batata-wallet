"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
  Transaction,
} from "@/types/transaction";
import { ArrowDownUpIcon } from "lucide-react";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MoneyInput } from "./money-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TRANSACTION_TYPE_OPTIONS,
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
} from "@/app/_constants/transactions";
import { DatePicker } from "@/components/ui/date-picker";
import { upsertTransaction } from "@/actions/upsert-transaction";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useEffect } from "react";

interface UpsertTransactionDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  defaultValues?: Transaction;
}

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  amount: z.number().positive({ message: "O valor deve ser positivo." }),
  type: z.nativeEnum(TransactionType),
  category: z.nativeEnum(TransactionCategory),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod),
  date: z.date({ error: "A data é obrigatória." }),
});

type FormSchema = z.infer<typeof formSchema>;

export function UpsertTransactionDialog({
  isOpen,
  setIsOpen,
  defaultValues,
}: UpsertTransactionDialogProps) {
  const isEditing = !!defaultValues?.id;
  const {
    executeAsync: executeUpSertTransaction,
    isPending: isCreatingTransaction,
  } = useAction(upsertTransaction);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
      ? {
          id: defaultValues.id,
          name: defaultValues.name,
          amount: defaultValues.amount,
          type: defaultValues.type,
          category: defaultValues.category,
          paymentMethod: defaultValues.paymentMethod,
          date: new Date(defaultValues.date),
        }
      : {
          name: "",
          amount: 0,
          type: TransactionType.DEPOSIT,
          category: TransactionCategory.OTHER,
          paymentMethod: TransactionPaymentMethod.OTHER,
          date: undefined,
        },
  });

  useEffect(() => {
    if (isOpen) {
      if (defaultValues) {
        form.reset({
          id: defaultValues.id,
          name: defaultValues.name,
          amount: defaultValues.amount,
          type: defaultValues.type,
          category: defaultValues.category,
          paymentMethod: defaultValues.paymentMethod,
          date: new Date(defaultValues.date),
        });
      } else {
        form.reset({
          name: "",
          amount: 0,
          type: TransactionType.DEPOSIT,
          category: TransactionCategory.OTHER,
          paymentMethod: TransactionPaymentMethod.OTHER,
          date: undefined,
        });
      }
    }
  }, [isOpen, defaultValues]);

  const onSubmit = async (data: FormSchema) => {
    const result = await executeUpSertTransaction(data);
    if (result.validationErrors) {
      return toast.error(result.validationErrors._errors?.[0]);
    }
    if (result.serverError) {
      return toast.error(
        isEditing ? "Erro ao atualizar transação" : "Erro ao criar transação",
      );
    }
    setIsOpen(false);
    form.reset();
    toast.success(
      isEditing
        ? "Transação atualizada com sucesso"
        : "Transação criada com sucesso",
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Transação" : "Adicionar Transação"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize os dados da transação."
              : "Insira os dados da transação para adicionar."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome da trasação" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o valor..."
                      value={field.value}
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione a categoria..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de pagamento</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um método de pagamento..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_PAYMENT_METHOD_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant="primary"
                disabled={isCreatingTransaction}
              >
                {isEditing ? "Atualizar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
