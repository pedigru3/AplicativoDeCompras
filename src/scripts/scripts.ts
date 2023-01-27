import { ItemType } from "@/contexts/item/context";

export function SumItems(list: ItemType[]) {
  if (!list.length) return "";
  const products = list.map((item) => item.price * item.qnt);
  const sum = products.reduce((total, number) => total + number);
  return sum.toFixed(2);
}
