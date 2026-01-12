import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@/types/transaction";

export const TRANSACTIONS_CATEGORY_LABELS: Record<TransactionCategory, string> =
  {
    [TransactionCategory.HOUSING]: "Moradia",
    [TransactionCategory.TRANSPORTATION]: "Transporte",
    [TransactionCategory.FOOD]: "Alimentação",
    [TransactionCategory.ENTERTAINMENT]: "Entretenimento",
    [TransactionCategory.HEALTH]: "Saúde",
    [TransactionCategory.UTILITY]: "Utilidade",
    [TransactionCategory.SALARY]: "Salário",
    [TransactionCategory.EDUCATION]: "Educação",
    [TransactionCategory.OTHER]: "Outro",
  };

export const TRANSACTION_PAYMENT_METHOD_ICONS = {
  [TransactionPaymentMethod.CREDIT_CARD]: "credit-card.svg",
  [TransactionPaymentMethod.DEBIT_CARD]: "debit-card.svg",
  [TransactionPaymentMethod.BANK_TRANSFER]: "bank-transfer.svg",
  [TransactionPaymentMethod.BANK_SLIP]: "bank-slip.svg",
  [TransactionPaymentMethod.CASH]: "money.svg",
  [TransactionPaymentMethod.PIX]: "pix.svg",
  [TransactionPaymentMethod.OTHER]: "other.svg",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS: Record<
  TransactionPaymentMethod,
  string
> = {
  [TransactionPaymentMethod.CREDIT_CARD]: "Cartão de Crédito",
  [TransactionPaymentMethod.DEBIT_CARD]: "Cartão de Débito",
  [TransactionPaymentMethod.BANK_TRANSFER]: "Transferência Bancária",
  [TransactionPaymentMethod.BANK_SLIP]: "Boleto Bancário",
  [TransactionPaymentMethod.CASH]: "Dinheiro",
  [TransactionPaymentMethod.PIX]: "PIX",
  [TransactionPaymentMethod.OTHER]: "Outro",
};

export const TRANSACTION_TYPE_OPTIONS = [
  { value: TransactionType.DEPOSIT, label: "Depósito" },
  { value: TransactionType.EXPENSE, label: "Despesa" },
  { value: TransactionType.INVESTMENT, label: "Investimento" },
];

export const TRANSACTION_CATEGORY_OPTIONS = [
  {
    value: TransactionCategory.HOUSING,
    label: TRANSACTIONS_CATEGORY_LABELS[TransactionCategory.HOUSING],
  },
  {
    value: TransactionCategory.TRANSPORTATION,
    label: TRANSACTIONS_CATEGORY_LABELS[TransactionCategory.TRANSPORTATION],
  },
  {
    value: TransactionCategory.FOOD,
    label: TRANSACTIONS_CATEGORY_LABELS[TransactionCategory.FOOD],
  },
  {
    value: TransactionCategory.ENTERTAINMENT,
    label: TRANSACTIONS_CATEGORY_LABELS[TransactionCategory.ENTERTAINMENT],
  },
  {
    value: TransactionCategory.HEALTH,
    label: TRANSACTIONS_CATEGORY_LABELS[TransactionCategory.HEALTH],
  },
  {
    value: TransactionCategory.UTILITY,
    label: TRANSACTIONS_CATEGORY_LABELS[TransactionCategory.UTILITY],
  },
  {
    value: TransactionCategory.SALARY,
    label: TRANSACTIONS_CATEGORY_LABELS[TransactionCategory.SALARY],
  },
  {
    value: TransactionCategory.EDUCATION,
    label: TRANSACTIONS_CATEGORY_LABELS[TransactionCategory.EDUCATION],
  },
  {
    value: TransactionCategory.OTHER,
    label: TRANSACTIONS_CATEGORY_LABELS[TransactionCategory.OTHER],
  },
];

export const TRANSACTION_PAYMENT_METHOD_OPTIONS = [
  {
    value: TransactionPaymentMethod.CREDIT_CARD,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CREDIT_CARD],
  },
  {
    value: TransactionPaymentMethod.DEBIT_CARD,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.DEBIT_CARD],
  },
  {
    value: TransactionPaymentMethod.BANK_TRANSFER,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_TRANSFER],
  },
  {
    value: TransactionPaymentMethod.BANK_SLIP,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_SLIP],
  },
  {
    value: TransactionPaymentMethod.CASH,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CASH],
  },
  {
    value: TransactionPaymentMethod.PIX,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.PIX],
  },
  {
    value: TransactionPaymentMethod.OTHER,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.OTHER],
  },
];
