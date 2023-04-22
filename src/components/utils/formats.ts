import { formatDistance, parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";
export function formatMonetary(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "BRL",
  });
}

export function formatDistanceFromToday(to: string) {
  const from = new Date()
  return formatDistance(parseISO(to), from, { locale: ptBR });
}

export function formatMonthDayYear(date: string){
  return format(parseISO(date), 'MMM dd, yyyy', {locale: ptBR});
}