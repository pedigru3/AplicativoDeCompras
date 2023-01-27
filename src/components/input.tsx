import { useContext, useState } from "react";

import ItemContext, { ItemSchemaOutput } from "@/contexts/item/context";

import { SumItems } from "@/scripts/scripts";

export default function Input(props: { itemProp: ItemSchemaOutput }) {
  const [name, setName] = useState(props.itemProp.name);

  const [qnt, setQnt] = useState(props.itemProp.qnt);
  const [price, setPrice] = useState(props.itemProp.price);
  const [category, setCategory] = useState(props.itemProp.category);
  const { state, setState, setTotal } = useContext(ItemContext);

  function handleClick({
    name = props.itemProp.name,
    qnt = props.itemProp.qnt,
    price = props.itemProp.price,
  }) {
    const oldList = state;
    const index = oldList.findIndex((item) => item.id === props.itemProp.id);
    oldList[index] = {
      id: props.itemProp.id,
      name: name,
      qnt: parseFloat(qnt),
      price: parseFloat(price),
      category: category,
    };
    setState(oldList);
    setTotal(SumItems(oldList));
    localStorage.setItem("items_db", JSON.stringify(oldList));
  }

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  return (
    <form className="[&>input]:w-1/3 [&>input]:bg-slate-400 [&>input]:m-1">
      <div className="flex [&>input]:h-10 [&>input]:text-center">
        <input
          className="box-content m-0.5 w-2/4"
          type="text"
          placeholder="nome"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            handleClick({ name: e.target.value });
          }}
          onSuspendCapture={() => console.log("teste")}
        />
        <input
          className="box-content m-0.5 border-none w-1/4"
          type="number"
          placeholder="quantidade"
          value={qnt}
          onChange={(e) => {
            setQnt(e.target.value);
            handleClick({ qnt: e.target.value });
          }}
        />
        <input
          className="box-content m-0.5 border-none w-1/4"
          type="number"
          placeholder="preço"
          prefix=""
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            clearTimeout(timeoutId);
            const newTimeoutId = setTimeout(() => {
              setPrice(parseFloat(e.target.value).toFixed(2));
              handleClick({ price: e.target.value });
            }, 3000);
            setTimeoutId(newTimeoutId);
          }}
        />
      </div>
    </form>
  );
}
