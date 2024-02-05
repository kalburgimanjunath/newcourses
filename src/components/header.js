import { Link } from "react-router-dom";
export default function Header() {
  const menus = [
    { title: "home", link: "/" },
    { title: "Pro", link: "/landing/pro-page" },
    { title: "all", link: "/all" },
    { title: "questions", link: "/question" },
    { title: "youtube", link: "/landing/youtube" },
    { title: "signin", link: "/signin" },
    { title: "register", link: "/register" },
  ];
  return (
    <div className="flex justify-between bg-black text-white fixed top-0 z-10 w-full">
      {menus.map((item) => {
        return (
          <Link
            key={item}
            to={item.link}
            className="p-6 hover:bg-pink-400 cursor-pointer"
          >
            {item.title.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
