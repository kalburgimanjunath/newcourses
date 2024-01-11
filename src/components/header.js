import { Link } from "react-router-dom";
export default function Header() {
  const menus = [
    { title: "home", link: "/" },
    { title: "Pro", link: "/pro" },
    { title: "all", link: "/all" },
    { title: "youtube", link: "/youtube" },
    { title: "signin", link: "/signin" },
    { title: "register", link: "/register" },
  ];
  return (
    <div className="flex justify-between bg-pink-300">
      {menus.map((item) => {
        return (
          <Link
            key={item}
            to={item.link}
            className="p-2 hover:bg-pink-400 cursor-pointer"
          >
            {item.title.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
