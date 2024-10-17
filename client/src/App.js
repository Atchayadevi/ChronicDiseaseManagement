import { useState } from "react";
import ListAvailableBooks from "./component/ListAvailableBooks";
import BookAvailableSeniorList from "./component/BookAvailableSeniorList";
function App() {
  const [senior, setSeniorSide] = useState(false);
  const [junior, setJuniorSide] = useState(false);
  const showSeniorSide = () => {
    setSeniorSide(true);
    setJuniorSide(false);
  };

  const showJuniorSide = () => {
    setJuniorSide(true);
    setSeniorSide(false);
  };

  return (
    <>
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-4xl text-white bg-[#25154d] p-6 text-center ">
          Book Exchange for Engineering Students
        </h1>
        <h3 className="text-center text-2xl md:text-3xl lg:text-4xl xl:text-3xl text-sky-950 p-6 font-bold ">
          Easily find and share books between seniors and juniors.
        </h3>
        <h1 className=" p-10 sm:p-28 lg:p-28 font-serif leading-loose md:p-20 text-center bg-pink-950 text-white text-3xl">
          Welcome to the platform where seniors can list their used books and
          juniors can find them easily. Let’s make book sharing simpler and
          reduce waste!
        </h1>
      </div>
      <div class="flex space-x-5 sm:space-x-60 lg:p-14 p-5 sm:p-28 lg:space-x-94 md:space-x-80 lg:ml-20 xl:ml-96 ">
        {/* <!-- Senior Button --> */}
        <button
          class="bg-blue-500 text-white py-5 px-10   lg:py-9 lg:px-16 font-bold text-2xl rounded-lg hover:bg-blue-600 focus:outline-none "
          onClick={showSeniorSide}
        >
          Senior
        </button>

        {/* <!-- Junior Button --> */}
        <button
          class="bg-green-500 text-white font-bold text-2xl py-5 px-10 lg:py-9 lg:px-16 rounded-lg hover:bg-green-600 focus:outline-none"
          onClick={showJuniorSide}
        >
          Junior
        </button>
      </div>

      {senior && <ListAvailableBooks />}
      {junior && <BookAvailableSeniorList />}
    </>
  );
}

export default App;
