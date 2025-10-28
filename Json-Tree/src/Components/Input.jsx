import React, { useRef } from "react";

function Input() {
  const DefaultInputjson = {
    user: {
      name: "Ravi",
      age: 21,
    },
  };

  const JsonInput = useRef("");

  const Visualize = (e) => {
    e.preventDefault();
    try {
      if (typeof JsonInput.current.value !== "object") {
        const ParseInputJson = JSON.parse(JsonInput.current.value);
        console.log(ParseInputJson, "Parsed JSON");
      } else {
        console.log("The data should be in JSON format");
      }
    } catch (err) {
      alert("The data should be in JSON format");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          JSON Visualizer
        </h1>
        <textarea
          name="JsonDataInput"
          id="userInput"
          placeholder={JSON.stringify(DefaultInputjson, null, 2)}
          ref={JsonInput}
          required
          className="w-full h-64 p-4 border border-gray-300 rounded-xl outline-none font-mono text-sm text-gray-700 resize-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
        ></textarea>
        <button
          onClick={Visualize}
          className="mt-5 w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all duration-300 shadow-md"
        >
          Visualize
        </button>
      </div>
    </div>
  );
}

export default Input;
