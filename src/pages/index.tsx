import Input from "@/components/input";
import Menu from "@/components/menu";
import ItemContext, { itemSchema, ItemType } from "@/contexts/item/context";
import { Category } from "@/interfaces/interfaces";
import { SumItems } from "@/scripts/scripts";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { state, setState, total, setTotal } = useContext(ItemContext);
  const [category, setCategory] = useState<Category>(Category.Alimentos);
  const [filteredItems, setFilteredItems] = useState<ItemType[]>([]);

  useEffect(() => {
    const oldItems = localStorage.getItem("items_db");
    if (oldItems?.length) {
      const newList: ItemType[] = JSON.parse(oldItems);
      setState(newList);
      setTotal(SumItems(newList));
      const newFilter = newList.filter(
        (item) => item.category === Category.Alimentos
      );
      setFilteredItems(newFilter);
    }
  }, []);

  const handleMenuClick = (newValue: Category) => {
    setCategory(newValue);
    const newFilter = state.filter((item) => item.category === newValue);
    setFilteredItems(newFilter);
  };

  // Alimentos

  const [name, setName] = useState("");
  const [qnt, setQnt] = useState("");
  const [price, setPrice] = useState("");

  function handleClickButton(e: React.FormEvent) {
    if (name && qnt && price) {
      const newList = [
        ...state,
        {
          id: Date.now().toString(),
          name: name,
          qnt: parseFloat(qnt),
          price: parseFloat(price),
          category: category,
        },
      ];
      setState(newList);

      const newItens = JSON.stringify(newList);
      localStorage.setItem("items_db", newItens);
      setName("");
      setQnt("");
      setPrice("");

      setTotal(SumItems(newList));
    }

    e.preventDefault();
  }

  return (
    <>
      <div>
        <Menu onClick={handleMenuClick} />
      </div>
      <h1 className="text-[40px] font-bold text-center">{category}</h1>
      <div>
        <div className="flex [&>div]:text-center [&>div]:font-bold ">
          <div className="w-2/4 bg-orange-400 m-1">Item</div>
          <div className="w-1/4 bg-orange-400  m-1">Qnt</div>
          <div className="w-1/4 bg-orange-400  m-1">Preço</div>
        </div>
        <ul>
          {filteredItems.map((item) => (
            <li
              key={item.id}
              className="flex [&>div]:h-10 [&>div]:justify-center align-middle [&>div]:flex [&>div]:items-center"
            >
              <Input itemProp={itemSchema.parse(item)}></Input>
            </li>
          ))}
        </ul>
        <div className="flex flex-col justify-between">
          <form className="[&>input]:bg-slate-400 mt-10">
            <div className="flex">
              <input
                className="w-2/4 m-0.5 appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="nome do item"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="m-0.5 appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-1/4"
                type="number"
                placeholder="quantidade"
                value={qnt}
                onChange={(e) => setQnt(e.target.value)}
                required
              />
              <input
                className="m-0.5 appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-1/4"
                type="number"
                placeholder="preço"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="w-full flex items-stretch">
              <button
                type="button"
                className=" bg-orange-400 rounded-md box-border h-10 mx-1 w-full"
                onClick={handleClickButton}
              >
                Adicionar
              </button>
            </div>
          </form>
          <div className="0 m-1 rounded-md h-10 flex items-center px-5">
            <p className="font-bold">{`Total: R$ ${total}`}</p>
          </div>
        </div>
      </div>
    </>
  );
}
