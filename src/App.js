import "./styles.css";
import { useState, useEffect } from "react";
import Loader from "./Loader";

export default function App() {
  const [query, setQuery] = useState("");
  const [num, setNum] = useState(1);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(`https://fakestoreapi.com/products/${num}`)
  //           .then(res=>res.json())
  //           .then(json=> {
  //             setData(json);
  //             setIsLoading(false)
  //           }).catch(() => {
  //             setIsLoading(false);
  //           })
  // }, [num]);

  useEffect(() => {
    setIsLoading(true);

    async function toDo() {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${num}`
        );
        const json = await response.json();
        setData(json);
      } finally {
        setIsLoading(false);
      }
    }

    toDo();
  }, [num]);

  return (
    <div className="App">
      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      <button
        onClick={() => {
          setNum(num + 1);
        }}
      >
        Inc {num}
      </button>
      {isLoading ? <Loader /> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
