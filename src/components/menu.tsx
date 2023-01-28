import { Category } from "@/interfaces/interfaces";
import { useState } from "react";

interface MenuProps {
  onClick: (value: Category) => void;
}

export default function Menu(props: MenuProps) {
  const [category, setCategory] = useState(Category.Alimentos);

  function handleClick(value: Category) {
    props.onClick(value);
    setCategory(value);
  }

  const menuData = [
    {
      label: "Alimentos",
      category: Category.Alimentos,
    },
    {
      label: "Higiene",
      category: Category.HigienePessoal,
    },
    {
      label: "Limpeza",
      category: Category.Limpeza,
    },
    {
      label: "Utilidades",
      category: Category.Utilidades,
    },
    {
      label: "Feira",
      category: Category.Feira,
    },
    {
      label: "Carnes",
      category: Category.Carnes,
    },
  ];

  return (
    <div id="nav" className="w-full">
      <ul className="m-2 flex justify-between [&>li>button]:rounded [&>li>button]:p-4 overflow-auto">
        {menuData.map((menu) => (
          <li key={menu.category} className="mr-2">
            <button
              onClick={() => handleClick(menu.category)}
              className={
                menu.category === category ? "bg-orange-500" : "bg-orange-200 "
              }
            >
              {menu.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
