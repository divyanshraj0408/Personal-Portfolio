import { useState, useEffect, useCallback } from "react";

// Tabler Icons inline SVGs
const icons = {
  command: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M7 9a2 2 0 1 1 2-2v10a2 2 0 1 1-2-2h10a2 2 0 1 1-2 2V7a2 2 0 1 1 2 2H7" />
    </svg>
  ),
  option: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M3 6h5l6 12h7" /><path d="M14 6h7" />
    </svg>
  ),
  shift: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M12 2L4.5 9.5H9V18H15V9.5H19.5L12 2Z" />
    </svg>
  ),
  delete: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M20 5H9L2 12l7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" /><path d="m13 9 4 4m0-4-4 4" />
    </svg>
  ),
  arrowUp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <path d="m18 15-6-6-6 6" />
    </svg>
  ),
  arrowDown: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  arrowLeft: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
  arrowRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  capslock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M12 3L4.5 10.5H9V15H15V10.5H19.5L12 3Z" /><path d="M9 19H15" />
    </svg>
  ),
  fn: null,
  control: null,
  return: null,
  tab: null,
};

// Corner rounding logic
function getCornerClass(position) {
  const map = {
    "top-left": "rounded-tl-[4px]",
    "top-right": "rounded-tr-[4px]",
    "bottom-left": "rounded-bl-[4px]",
    "bottom-right": "rounded-br-[4px]",
    "top-left-corner": "rounded-tl-[6px] rounded-bl-[2px] rounded-tr-[2px] rounded-br-[2px]",
    "top-right-corner": "rounded-tr-[6px] rounded-tl-[2px] rounded-bl-[2px] rounded-br-[2px]",
    "bottom-left-corner": "rounded-bl-[6px] rounded-tl-[2px] rounded-tr-[2px] rounded-br-[2px]",
    "bottom-right-corner": "rounded-br-[6px] rounded-tl-[2px] rounded-tr-[2px] rounded-bl-[2px]",
    default: "rounded-[3px]",
  };
  return map[position] || map.default;
}

// Individual Key Component
function Key({
  label,
  subLabel,
  icon,
  width = 1,
  height = 1,
  position,
  keyCode,
  pressedKeys,
  onKeyPress,
  labelPosition = "center",
  fontSize = "text-xs",
  extraClass = "",
}) {
  const isPressed = pressedKeys.has(keyCode);
  const cornerClass = getCornerClass(position);
  const baseWidth = 36;
  const gap = 4;
  const pixelWidth = width * baseWidth + (width - 1) * gap;
  const pixelHeight = height * baseWidth + (height - 1) * gap;

  return (
    <button
      onMouseDown={() => onKeyPress(keyCode, true)}
      onMouseUp={() => onKeyPress(keyCode, false)}
      onMouseLeave={() => isPressed && onKeyPress(keyCode, false)}
      onTouchStart={(e) => { e.preventDefault(); onKeyPress(keyCode, true); }}
      onTouchEnd={() => onKeyPress(keyCode, false)}
      style={{
        width: `${pixelWidth}px`,
        height: `${pixelHeight}px`,
        minWidth: `${pixelWidth}px`,
        transform: isPressed ? "scale(0.96) translateY(0.5px)" : "scale(1)",
        boxShadow: isPressed
          ? "inset 0 2px 4px rgba(0,0,0,0.18), inset 0 1px 2px rgba(0,0,0,0.12)"
          : "inset 0 -2px 0px rgba(0,0,0,0.13), inset 0 1px 0px rgba(255,255,255,0.85), 0 1px 2px rgba(0,0,0,0.10), inset 0 0 0 0.5px rgba(0,0,0,0.08)",
        transition: "transform 80ms ease, box-shadow 80ms ease",
        background: isPressed
          ? "linear-gradient(180deg, #d8d8d8 0%, #e5e5e5 100%)"
          : "linear-gradient(180deg, #ffffff 0%, #f0f0f0 60%, #e8e8e8 100%)",
      }}
      className={`
        relative flex shrink-0 cursor-pointer select-none border-0 outline-none
        ${cornerClass} ${fontSize} ${extraClass}
        ${labelPosition === "bottom-left" ? "items-end justify-start pb-1 pl-1.5" : ""}
        ${labelPosition === "center" ? "items-center justify-center" : ""}
        ${labelPosition === "bottom-right" ? "items-end justify-end pb-1 pr-1.5" : ""}
      `}
    >
      {subLabel && (
        <span
          className="absolute top-[5px] left-0 right-0 flex justify-center text-[9px] leading-none"
          style={{ color: "#888", fontWeight: 400 }}
        >
          {subLabel}
        </span>
      )}
      {icon ? (
        <span style={{ color: isPressed ? "#333" : "#444" }}>{icon}</span>
      ) : (
        <span
          style={{
            color: isPressed ? "#111" : "#1a1a1a",
            fontFamily: "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif",
            fontWeight: subLabel ? 600 : 500,
            letterSpacing: "-0.01em",
          }}
          className={fontSize}
        >
          {label}
        </span>
      )}
    </button>
  );
}

// Number Key with dual labels
function NumberKey({ num, sym, keyCode, pressedKeys, onKeyPress, position }) {
  const isPressed = pressedKeys.has(keyCode);
  const cornerClass = getCornerClass(position);

  return (
    <button
      onMouseDown={() => onKeyPress(keyCode, true)}
      onMouseUp={() => onKeyPress(keyCode, false)}
      onMouseLeave={() => isPressed && onKeyPress(keyCode, false)}
      onTouchStart={(e) => { e.preventDefault(); onKeyPress(keyCode, true); }}
      onTouchEnd={() => onKeyPress(keyCode, false)}
      style={{
        width: "36px",
        height: "36px",
        minWidth: "36px",
        transform: isPressed ? "scale(0.96) translateY(0.5px)" : "scale(1)",
        boxShadow: isPressed
          ? "inset 0 2px 4px rgba(0,0,0,0.18), inset 0 1px 2px rgba(0,0,0,0.12)"
          : "inset 0 -2px 0px rgba(0,0,0,0.13), inset 0 1px 0px rgba(255,255,255,0.85), 0 1px 2px rgba(0,0,0,0.10), inset 0 0 0 0.5px rgba(0,0,0,0.08)",
        transition: "transform 80ms ease, box-shadow 80ms ease",
        background: isPressed
          ? "linear-gradient(180deg, #d8d8d8 0%, #e5e5e5 100%)"
          : "linear-gradient(180deg, #ffffff 0%, #f0f0f0 60%, #e8e8e8 100%)",
      }}
      className={`relative flex shrink-0 flex-col items-center justify-between cursor-pointer select-none border-0 outline-none pt-[5px] pb-[5px] ${cornerClass}`}
    >
      <span
        style={{
          color: "#888",
          fontFamily: "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif",
          fontWeight: 400,
          fontSize: "9px",
          lineHeight: 1,
        }}
      >
        {sym}
      </span>
      <span
        style={{
          color: isPressed ? "#111" : "#1a1a1a",
          fontFamily: "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif",
          fontWeight: 600,
          fontSize: "11px",
          lineHeight: 1,
        }}
      >
        {num}
      </span>
    </button>
  );
}

// Arrow key cluster (half-height up/down)
function ArrowKey({ icon, keyCode, pressedKeys, onKeyPress, position, halfHeight = false }) {
  const isPressed = pressedKeys.has(keyCode);
  const cornerClass = getCornerClass(position);
  const h = halfHeight ? 16 : 36;

  return (
    <button
      onMouseDown={() => onKeyPress(keyCode, true)}
      onMouseUp={() => onKeyPress(keyCode, false)}
      onMouseLeave={() => isPressed && onKeyPress(keyCode, false)}
      onTouchStart={(e) => { e.preventDefault(); onKeyPress(keyCode, true); }}
      onTouchEnd={() => onKeyPress(keyCode, false)}
      style={{
        width: "36px",
        height: `${h}px`,
        minWidth: "36px",
        transform: isPressed ? "scale(0.96)" : "scale(1)",
        boxShadow: isPressed
          ? "inset 0 2px 4px rgba(0,0,0,0.18)"
          : "inset 0 -2px 0px rgba(0,0,0,0.13), inset 0 1px 0px rgba(255,255,255,0.85), 0 1px 2px rgba(0,0,0,0.10), inset 0 0 0 0.5px rgba(0,0,0,0.08)",
        transition: "transform 80ms ease, box-shadow 80ms ease",
        background: isPressed
          ? "linear-gradient(180deg, #d8d8d8 0%, #e5e5e5 100%)"
          : "linear-gradient(180deg, #ffffff 0%, #f0f0f0 60%, #e8e8e8 100%)",
      }}
      className={`flex shrink-0 items-center justify-center cursor-pointer select-none border-0 outline-none ${cornerClass}`}
    >
      <span style={{ color: isPressed ? "#333" : "#444" }}>{icon}</span>
    </button>
  );
}

export default function MacKeyboard() {
  const [pressedKeys, setPressedKeys] = useState(new Set());

  const handleKeyPress = useCallback((keyCode, isDown) => {
    setPressedKeys((prev) => {
      const next = new Set(prev);
      isDown ? next.add(keyCode) : next.delete(keyCode);
      return next;
    });
  }, []);

  useEffect(() => {
    const down = (e) => handleKeyPress(e.code, true);
    const up = (e) => handleKeyPress(e.code, false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [handleKeyPress]);

  const kp = { pressedKeys, onKeyPress: handleKeyPress };

  return (
    <div className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
      {/* Keyboard chassis */}
      <div
        className="relative"
        style={{
          background: "linear-gradient(180deg, #c8c8c8 0%, #b8b8b8 40%, #c0c0c0 100%)",
          borderRadius: "12px",
          padding: "10px 10px 12px",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.5), 0 8px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.2)",
        }}
      >
        {/* Inner recess */}
        <div
          style={{
            background: "linear-gradient(180deg, #b0b0b0 0%, #a8a8a8 100%)",
            borderRadius: "8px",
            padding: "8px",
            boxShadow: "inset 0 2px 6px rgba(0,0,0,0.25), inset 0 1px 2px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>

            {/* Row 1: Function Row */}
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <Key label="esc" keyCode="Escape" {...kp} fontSize="text-[9px]" position="top-left-corner" />
              {[
                { label: "F1", k: "F1" }, { label: "F2", k: "F2" }, { label: "F3", k: "F3" },
                { label: "F4", k: "F4" }, { label: "F5", k: "F5" }, { label: "F6", k: "F6" },
                { label: "F7", k: "F7" }, { label: "F8", k: "F8" }, { label: "F9", k: "F9" },
                { label: "F10", k: "F10" }, { label: "F11", k: "F11" }, { label: "F12", k: "F12" },
              ].map(({ label, k }) => (
                <Key key={k} label={label} keyCode={k} {...kp} fontSize="text-[9px]" />
              ))}
              <Key label="⏏︎" keyCode="Eject" {...kp} fontSize="text-xs" position="top-right-corner" />
            </div>

            {/* Row 2: Number Row */}
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <NumberKey num="`" sym="~" keyCode="Backquote" {...kp} />
              {[
                ["1","!","Digit1"], ["2","@","Digit2"], ["3","#","Digit3"], ["4","$","Digit4"],
                ["5","%","Digit5"], ["6","^","Digit6"], ["7","&","Digit7"], ["8","*","Digit8"],
                ["9","(","Digit9"], ["0",")","Digit0"], ["-","_","Minus"], ["=","+","Equal"],
              ].map(([n, s, k]) => (
                <NumberKey key={k} num={n} sym={s} keyCode={k} {...kp} />
              ))}
              <Key label="delete" keyCode="Backspace" {...kp} width={1.6} fontSize="text-[9px]" position="top-right-corner" labelPosition="center" />
            </div>

            {/* Row 3: QWERTY */}
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <Key label="tab" keyCode="Tab" {...kp} width={1.45} fontSize="text-[9px]" labelPosition="center" />
              {["Q","W","E","R","T","Y","U","I","O","P"].map(l => (
                <Key key={l} label={l} keyCode={`Key${l}`} {...kp} />
              ))}
              <NumberKey num="[" sym="{" keyCode="BracketLeft" {...kp} />
              <NumberKey num="]" sym="}" keyCode="BracketRight" {...kp} />
              <NumberKey num="\\" sym="|" keyCode="Backslash" {...kp} width={1.35} />
            </div>

            {/* Row 4: ASDF */}
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <Key icon={icons.capslock} label="" keyCode="CapsLock" {...kp} width={1.65} labelPosition="center"
                extraClass="relative" />
              {["A","S","D","F","G","H","J","K","L"].map(l => (
                <Key key={l} label={l} keyCode={`Key${l}`} {...kp} />
              ))}
              <NumberKey num=";" sym=":" keyCode="Semicolon" {...kp} />
              <NumberKey num="'" sym={'"'} keyCode="Quote" {...kp} />
              <Key label="return" keyCode="Enter" {...kp} width={2.05} fontSize="text-[9px]" position="bottom-right-corner" labelPosition="center" />
            </div>

            {/* Row 5: ZXCV */}
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <Key icon={icons.shift} label="shift" keyCode="ShiftLeft" {...kp} width={2.2} fontSize="text-[9px]" labelPosition="center" />
              {["Z","X","C","V","B","N","M"].map(l => (
                <Key key={l} label={l} keyCode={`Key${l}`} {...kp} />
              ))}
              <NumberKey num="," sym="<" keyCode="Comma" {...kp} />
              <NumberKey num="." sym=">" keyCode="Period" {...kp} />
              <NumberKey num="/" sym="?" keyCode="Slash" {...kp} />
              <Key icon={icons.shift} label="shift" keyCode="ShiftRight" {...kp} width={2.2} fontSize="text-[9px]" position="bottom-right-corner" labelPosition="center" />
            </div>

            {/* Row 6: Bottom Modifier Row */}
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <Key label="fn" keyCode="Fn" {...kp} fontSize="text-[9px]" position="bottom-left-corner" />
              <Key label="control" keyCode="ControlLeft" {...kp} width={1.1} fontSize="text-[9px]" labelPosition="center" />
              <Key icon={icons.option} label="option" keyCode="AltLeft" {...kp} width={1.1} fontSize="text-[9px]" labelPosition="center" />
              <Key icon={icons.command} label="command" keyCode="MetaLeft" {...kp} width={1.45} fontSize="text-[9px]" labelPosition="center" />
              {/* Space bar */}
              <button
                onMouseDown={() => handleKeyPress("Space", true)}
                onMouseUp={() => handleKeyPress("Space", false)}
                onMouseLeave={() => pressedKeys.has("Space") && handleKeyPress("Space", false)}
                style={{
                  height: "36px",
                  flexGrow: 1,
                  transform: pressedKeys.has("Space") ? "scale(0.99) translateY(0.5px)" : "scale(1)",
                  boxShadow: pressedKeys.has("Space")
                    ? "inset 0 2px 4px rgba(0,0,0,0.18)"
                    : "inset 0 -2px 0px rgba(0,0,0,0.13), inset 0 1px 0px rgba(255,255,255,0.85), 0 1px 2px rgba(0,0,0,0.10), inset 0 0 0 0.5px rgba(0,0,0,0.08)",
                  transition: "transform 80ms ease, box-shadow 80ms ease",
                  background: pressedKeys.has("Space")
                    ? "linear-gradient(180deg, #d8d8d8 0%, #e5e5e5 100%)"
                    : "linear-gradient(180deg, #ffffff 0%, #f0f0f0 60%, #e8e8e8 100%)",
                  borderRadius: "3px",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                }}
              />
              <Key icon={icons.command} label="command" keyCode="MetaRight" {...kp} width={1.45} fontSize="text-[9px]" labelPosition="center" />
              <Key icon={icons.option} label="option" keyCode="AltRight" {...kp} width={1.1} fontSize="text-[9px]" labelPosition="center" />

              {/* Arrow cluster */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <ArrowKey icon={icons.arrowLeft} keyCode="ArrowLeft" {...kp} position="default" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <ArrowKey icon={icons.arrowUp} keyCode="ArrowUp" {...kp} halfHeight position="top-right-corner" />
                <ArrowKey icon={icons.arrowDown} keyCode="ArrowDown" {...kp} halfHeight position="bottom-right-corner" />
              </div>
              <ArrowKey icon={icons.arrowRight} keyCode="ArrowRight" {...kp} position="bottom-right-corner" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}