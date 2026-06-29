import { useState, useEffect, useRef } from "react";
import "./Popover.css";

function Popover({ button, className, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const handleContentClick = (e) => {
    if (e.target.closest("a")) {
      setIsOpen(false);
    }
  };

  return (
    <div className="popover" ref={ref}>
      <button
        className={"popover__button " + className}
        onClick={() => setIsOpen(!isOpen)}
      >
        {button}
      </button>

      <div
        className={`block popover__content ${isOpen ? "open" : ""}`}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  );
}

export default Popover;
