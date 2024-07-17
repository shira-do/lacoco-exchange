import { useEffect, useState } from "react";

export default function Header() {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="navbar bg-base-100 flex justify-between">
      <a className="btn btn-ghost text-xl">La Coco Crypto Exchange</a>
      <span>{currentDateTime}</span>
    </div>
  );
}
