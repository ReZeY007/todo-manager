import { useState } from "react";
import "./Checkbox.css";

function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
  id,
}) {
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleClick = (e) => {
    if (disabled) return;
    const next = !checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next, e);

    // Ripple-эффект
    const box = e.currentTarget.querySelector(".cb-box");
    const ripple = document.createElement("span");
    ripple.className = "cb-ripple";
    ripple.style.cssText = "width:22px;height:22px;left:0;top:0;";
    box.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      data-checked={String(checked)}
      className="cb-root"
      tabIndex={disabled ? -1 : 0}
      id={id}
      onClick={handleClick}
      onKeyDown={(e) => (e.key === " " || e.key === "Enter") && handleClick(e)}
      style={{
        opacity: disabled ? 0.4 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      <div className="cb-box">
        <div className="cb-tick">
          <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
            <path
              d="M1 4L4.5 7.5L11 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {label && <span className="cb-label">{label}</span>}
    </div>
  );
}

export default Checkbox;
