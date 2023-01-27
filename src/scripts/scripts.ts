import { Item } from "@/interfaces/interfaces";

export function SumItems(list: Item[]) {
  if (!list.length) return "";
  const products = list.map((item) => item.price * item.qnt);
  const sum = products.reduce((total, number) => total + number);
  return sum.toFixed(2);
}
