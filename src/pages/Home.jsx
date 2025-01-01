import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../counterSlice";

function Home() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Counter App</h1>
      <div className="text-6xl font-extrabold mb-8">{count}</div>
      <div className="flex gap-4">
        <button
          onClick={() => dispatch(increment())}
          className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
        >
          Decrement
        </button>
        <button
          onClick={() => dispatch(reset())}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Home;
