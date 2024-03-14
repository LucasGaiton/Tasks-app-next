
import Tasks from "./components/Tasks";
import ColorChangingTitle from "./components/ColorChangeTitle";
export default function Home() {
  
  
  return (
    <div className="flex flex-col items-center justify-center ">
      <ColorChangingTitle></ColorChangingTitle>
      <Tasks></Tasks>
    </div>
  );
}
