import { useContext, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";

import ItemContext, {
  ItemSchemaOutput,
  ItemType,
} from "@/contexts/item/context";

import { SumItems } from "@/scripts/scripts";

export default function Input(props: {
  itemProp: ItemSchemaOutput;
  onClickDelete: (value: ItemType[]) => void;
}) {
  const [name, setName] = useState(props.itemProp.name);

  const [qnt, setQnt] = useState(props.itemProp.qnt);
  const [price, setPrice] = useState(props.itemProp.price);
  const [category] = useState(props.itemProp.category);
  const { state, setState, setTotal } = useContext(ItemContext);

  const [focus, setFocus] = useState(false);

  function handleClick({ newName = name, newQnt = qnt, newPrice = price }) {
    const oldList = state;
    const index = oldList.findIndex((item) => item.id === props.itemProp.id);
    oldList[index] = {
      id: props.itemProp.id,
      name: newName,
      qnt: parseFloat(newQnt),
      price: parseFloat(newPrice),
      category: category,
    };
    setState(oldList);
    setTotal(SumItems(oldList));
    localStorage.setItem("items_db", JSON.stringify(oldList));
  }

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  function handleOnFocus() {
    clearTimeout(timeoutId);
    setFocus(true);
  }

  function handleOnBlur() {
    const newTimeoutId = setTimeout(() => setFocus(false), 100);
    setTimeoutId(newTimeoutId);
  }

  function handleDelete() {
    let newList = state;
    const index = state.findIndex((item) => item.id === props.itemProp.id);
    newList.splice(index, 1);
    setState(newList);
    localStorage.setItem("items_db", JSON.stringify(newList));
    props.onClickDelete(newList);
  }

  return (
    <form className="[&>input]:w-1/3 [&>input]:bg-slate-400 [&>input]:m-1 relative">
      <button
        onClick={(e) => {
          handleDelete();
          e.preventDefault();
        }}
        className={`flex justify-center items-center absolute top-1 left-1 w-8 h-8 rounded-[50%] bg-orange-400 ${
          focus ? "" : "hidden"
        }`}
      >
        <BsFillTrashFill className="" />
      </button>
      <div className="flex [&>input]:h-10 [&>input]:text-center">
        <input
          className="box-content m-0.5 w-2/4"
          type="text"
          placeholder="nome"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            handleClick({ newName: e.target.value });
          }}
          onSuspendCapture={() => console.log("teste")}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        <input
          className="box-content m-0.5 border-none w-1/4"
          type="number"
          placeholder="quantidade"
          value={qnt}
          onChange={(e) => {
            setQnt(e.target.value);
            handleClick({ newQnt: e.target.value });
          }}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
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
              handleClick({ newPrice: e.target.value });
            }, 1500);
            setTimeoutId(newTimeoutId);
          }}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </div>
    </form>
  );
}
