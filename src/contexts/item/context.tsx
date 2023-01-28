import { Category } from "@/interfaces/interfaces";
import { SumItems } from "@/scripts/scripts";
import React, { createContext, useEffect, useState } from "react";

export type ItemType = {
  name: string;
  id: string;
  qnt: number;
  price: number;
  category: Category;
};

import { z } from "zod";

export const itemSchema = z.object({
  name: z.string(),
  id: z.string(),
  qnt: z
    .number()
    .nullable()
    .transform((qnt) => {
      if (qnt) {
        return qnt.toString();
      } else {
        return "0";
      }
    })
    .or(z.nan().transform((nan) => "Valor inválido")),
  price: z
    .number()
    .nullable()
    .transform((qnt) => (qnt ? qnt.toFixed(2) : "0,00"))
    .or(z.nan().transform((nan) => "0")),
  category: z.enum([
    Category.Alimentos,
    Category.Carnes,
    Category.Feira,
    Category.HigienePessoal,
    Category.Limpeza,
    Category.Utilidades,
  ]),
});

export type ItemSchemaOutput = z.output<typeof itemSchema>;
export type ItemSchemaInput = z.input<typeof itemSchema>;

type PropsItemContext = {
  state: ItemType[];
  setState: React.Dispatch<React.SetStateAction<ItemType[]>>;
  total: string;
  setTotal: React.Dispatch<React.SetStateAction<string>>;
};

const DEFAULT_VALUE: PropsItemContext = {
  total: "",
  state: [],
  setState: () => {},
  setTotal: () => {},
};

const ItemContext = createContext<PropsItemContext>(DEFAULT_VALUE);

const ItemContextProvider: React.FC<any> = ({ children }) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);
  const [total, setTotal] = useState(SumItems(DEFAULT_VALUE.state));

  return (
    <ItemContext.Provider value={{ state, setState, total, setTotal }}>
      {children}
    </ItemContext.Provider>
  );
};

/*export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const result = localStorage.getItem("item_storage");
    if (result) {
      const ItemsStorage = JSON.parse(result);
      if (ItemsStorage.length) {
        setItems(ItemsStorage);
      }
    }
  }, []);

  function addToList(item) {
    setItems([...items, item]);
    console.log("item adicionado na lista");
    console.log(items.length);
    localStorage.setItem("item_storage", JSON.stringify(items));
  }

  return <ItemsContext.Provider>{children}</ItemsContext.Provider>;
};*/

export { ItemContextProvider };
export default ItemContext;
