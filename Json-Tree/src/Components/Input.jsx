import React, { useRef, useState } from "react";
import JsonTree from "./JsonTree";

function Input() {
  const DefaultInputjson = {
    user: {
      name: "Ravi",
      age: 21,
      city: "Bangalore",
    },
  };

  const JsonInput = useRef("");
  const [parseinput, setparseinpt] = useState(null);

  const Visualize = (e) => {
    e.preventDefault();
    try {
      const ParseInputJson = JSON.parse(JsonInput.current.value);
      setparseinpt(JsonInput.current.value);
    } catch (err) {
      alert("⚠️ Invalid JSON format! Please check your input.");
    }
  };
  const [first, setfirst] = useState(true);
  const [theme, setTheme] = useState("Ligth");
  const [JsonSearch, SetJsonsearch] = useState("User.name");
  console.log(JsonSearch, "JsonSearch");
  const handelToggle = () => {
    setfirst((prev) => !prev);
    if (first) {
      setTheme("Ligth");
    } else {
      setTheme("dark");
    }
  };

  //   console.log(theme,'theme')
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex flex-col md:flex-row items-start justify-center gap-6 p-6">
      {/* LEFT SIDE — Input Form */}
      <button onClick={handelToggle}>{theme}</button>

      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">
          🧾 JSON Visualizer
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

      {/* RIGHT SIDE — JSON Tree */}
  <div className="w-full md:w-1/2 bg-white shadow-2xl rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 transition-all duration-300 hover:shadow-3xl">
  <div className="w-full flex items-center gap-2">
    <input
      type="text"
      placeholder="🔍 Search JSON keys..."
      value={JsonSearch}
      onChange={(e) => SetJsonsearch(e.target.value)}
      className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-xl px-4 py-2 outline-none transition-all duration-200"
    />
    {JsonSearch && (
      <button
        onClick={() => SetJsonsearch("")}
        className="bg-red-500 text-white px-3 py-2 rounded-xl hover:bg-red-600 transition duration-200"
      >
        Clear
      </button>
    )}
  </div>

  <div className="w-full mt-4 bg-gray-50 rounded-xl p-4 overflow-y-auto max-h-[400px] border border-gray-200">
    {parseinput ? (
      <JsonTree data={parseinput} />
    ) : (
      <p className="text-gray-500 text-center italic">
        Enter JSON on the left and click <span className="font-semibold text-blue-600">“Visualize”</span>
      </p>
    )}
  </div>
</div>

    </div>
  );
}

export default Input;
