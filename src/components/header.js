
export default function Header() {
  const menus = ["home", "Pro", "all", "youtube", "signin", "register"];
  return (
    <div>
      {menus.map((item) => {
        return <div>{item}</div>;
      })}
    </div>
  );
}
