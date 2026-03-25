import { useState, useEffect, useCallback, useRef } from "react";

const Ico = {
  cmd: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}><path d="M7 9a2 2 0 1 1 2-2v10a2 2 0 1 1-2-2h10a2 2 0 1 1-2 2V7a2 2 0 1 1 2 2H7" /></svg>,
  opt: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}><path d="M3 6h5l6 12h7" /><path d="M14 6h7" /></svg>,
  shift: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}><path d="M12 2L4.5 9.5H9V18H15V9.5H19.5Z" /></svg>,
  caps: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}><path d="M12 3L4.5 10.5H9V15H15V10.5H19.5Z" /><path d="M9 19H15" /></svg>,
  up: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 10, height: 10 }}><path d="m18 15-6-6-6 6" /></svg>,
  dn: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 10, height: 10 }}><path d="m6 9 6 6 6-6" /></svg>,
  lt: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 10, height: 10 }}><path d="m15 18-6-6 6-6" /></svg>,
  rt: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 10, height: 10 }}><path d="m9 18 6-6-6-6" /></svg>,
  sound: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>,
  mute: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><path d="M11 5 6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>,
};

const B = 38, G = 5;
let rippleId = 0;

// ── Web Audio synthesized key sounds ──────────────────────────────────────
function createAudioEngine(profile = "tactile") {
  let ctx = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  // Profile tuning
  const profiles = {
    tactile: { gain: 1.0, sharp: 1.0 },
    clicky: { gain: 1.4, sharp: 1.3 },
    soft: { gain: 0.5, sharp: 0.7 },
  };

  const cfg = profiles[profile] || profiles.tactile;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function noiseBurst(ac, t, duration, gain, freq) {
    const buffer = ac.createBuffer(1, ac.sampleRate * duration, ac.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * rand(0.8, 1.2);
    }

    const src = ac.createBufferSource();
    src.buffer = buffer;

    const filter = ac.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = freq * rand(0.9, 1.1);
    filter.Q.value = 1.2 * cfg.sharp;

    const gainNode = ac.createGain();
    gainNode.gain.setValueAtTime(gain * cfg.gain, t);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    const pan = ac.createStereoPanner();
    pan.pan.value = rand(-0.2, 0.2);

    src.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(pan);
    pan.connect(ac.destination);

    src.start(t);
  }

  function tone(ac, t, freq, gain, decay) {
    const osc = ac.createOscillator();
    osc.type = "sine";

    const f = freq * rand(0.95, 1.05);

    osc.frequency.setValueAtTime(f, t);
    osc.frequency.exponentialRampToValueAtTime(f * 0.4, t + decay);

    const gainNode = ac.createGain();
    gainNode.gain.setValueAtTime(gain * cfg.gain, t);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, t + decay);

    const pan = ac.createStereoPanner();
    pan.pan.value = rand(-0.15, 0.15);

    osc.connect(gainNode);
    gainNode.connect(pan);
    pan.connect(ac.destination);

    osc.start(t);
    osc.stop(t + decay + 0.05);
  }

  return {
    click() {
      const ac = getCtx();
      const t = ac.currentTime;

      noiseBurst(ac, t, 0.015, 0.25, 4000);
      noiseBurst(ac, t, 0.008, 0.18, 8000);

      tone(ac, t, 200, 0.05, 0.05);
      tone(ac, t + 0.002, 130, 0.03, 0.07);
    },

    space() {
      const ac = getCtx();
      const t = ac.currentTime;

      noiseBurst(ac, t, 0.025, 0.35, 1500);
      noiseBurst(ac, t, 0.012, 0.2, 3000);

      tone(ac, t, 90, 0.12, 0.1);
      tone(ac, t + 0.003, 140, 0.05, 0.08);
    },

    enter() {
      const ac = getCtx();
      const t = ac.currentTime;

      noiseBurst(ac, t, 0.02, 0.3, 2500);
      noiseBurst(ac, t, 0.01, 0.2, 6000);

      tone(ac, t, 160, 0.1, 0.08);
      tone(ac, t + 0.003, 110, 0.06, 0.1);
    },

    mod() {
      const ac = getCtx();
      const t = ac.currentTime;

      noiseBurst(ac, t, 0.012, 0.15, 3000);
      tone(ac, t, 170, 0.03, 0.04);
    },

    fn() {
      const ac = getCtx();
      const t = ac.currentTime;

      noiseBurst(ac, t, 0.01, 0.12, 6000);
      tone(ac, t, 240, 0.02, 0.03);
    }
  };
}

// ── Helpers ────────────────────────────────────────────────────────────────
function heatColor(count, max) {
  if (!count || !max) return null;
  const t = Math.min(count / Math.max(max, 1), 1);
  if (t < 0.33) return `rgba(96,165,250,${0.12 + t * 0.35})`;
  if (t < 0.66) return `rgba(251,191,36,${0.18 + t * 0.35})`;
  return `rgba(248,113,113,${0.25 + t * 0.5})`;
}

function soundTypeFor(keyCode) {
  if (["Space"].includes(keyCode)) return "space";
  if (["Enter"].includes(keyCode)) return "enter";
  if (["Backspace"].includes(keyCode)) return "enter";
  if (["ShiftLeft", "ShiftRight", "ControlLeft", "ControlRight", "AltLeft", "AltRight", "MetaLeft", "MetaRight", "CapsLock", "Tab", "Fn"].includes(keyCode)) return "mod";
  if (keyCode.startsWith("F") && !keyCode.startsWith("Fn") || keyCode === "Escape") return "fn";
  return "click";
}

// ── Key components ─────────────────────────────────────────────────────────
function Key({ label, icon, width = 1, height = 1, keyCode, pressedKeys, onKeyPress,
  align = "center", mod = false, heatCounts, maxHeat, showHeat, ripples, onRipple, playSound }) {
  const isPressed = pressedKeys.has(keyCode);
  const count = heatCounts?.[keyCode] || 0;
  const heat = showHeat ? heatColor(count, maxHeat) : null;
  const w = width * B + (width - 1) * G;
  const h = height * B + (height - 1) * G;
  const myRipples = ripples.filter(r => r.keyCode === keyCode);
  const fg = mod
    ? (isPressed ? "rgba(210,205,255,0.95)" : "rgba(150,140,200,0.7)")
    : (isPressed ? "rgba(235,232,255,1)" : "rgba(200,196,245,0.85)");

  function handleDown() { onKeyPress(keyCode, true); onRipple(keyCode); playSound(keyCode); }

  return (
    <div
      onMouseDown={handleDown}
      onMouseUp={() => onKeyPress(keyCode, false)}
      onMouseLeave={() => isPressed && onKeyPress(keyCode, false)}
      onTouchStart={e => { e.preventDefault(); handleDown(); }}
      onTouchEnd={() => onKeyPress(keyCode, false)}
      style={{
        width: w, height: h, minWidth: w, flexShrink: 0,
        position: "relative", overflow: "hidden", borderRadius: 7,
        cursor: "pointer", userSelect: "none",
        display: "flex",
        alignItems: align === "bottom" ? "flex-end" : "center",
        justifyContent: align === "left" ? "flex-start" : "center",
        padding: align === "bottom" ? "0 0 6px 7px" : 0,
        transition: "transform 65ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 65ms ease",
        transform: isPressed ? "scale(0.92) translateY(2px)" : "scale(1)",
        background: isPressed
          ? (mod ? "rgba(30,24,54,0.97)" : "rgba(40,36,66,0.97)")
          : (mod ? "rgba(26,20,50,0.92)" : "rgba(48,44,76,0.88)"),
        boxShadow: isPressed
          ? "inset 0 3px 8px rgba(0,0,0,0.65), 0 0 0 1px rgba(80,70,150,0.2)"
          : heat
            ? `0 3px 0 rgba(0,0,0,0.55), 0 5px 12px rgba(0,0,0,0.3), 0 0 0 1px rgba(110,100,190,0.3), inset 0 0 0 1000px ${heat}, inset 0 1px 0 rgba(255,255,255,0.07)`
            : "0 3px 0 rgba(0,0,0,0.55), 0 5px 12px rgba(0,0,0,0.3), 0 0 0 1px rgba(110,100,190,0.28), inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
    >
      {myRipples.map(r => (
        <span key={r.id} style={{
          position: "absolute", borderRadius: "50%",
          width: Math.max(w, h) * 2.5, height: Math.max(w, h) * 2.5,
          left: "50%", top: "50%", transform: "translate(-50%,-50%) scale(0)",
          background: "rgba(140,128,255,0.28)",
          animation: "kripple 480ms ease-out forwards", pointerEvents: "none",
        }} />
      ))}
      {keyCode === "CapsLock" && pressedKeys.has("CapsLock") && (
        <div style={{
          position: "absolute", top: 6, right: 6, width: 5, height: 5, borderRadius: "50%",
          background: "rgba(80,255,140,0.95)", boxShadow: "0 0 8px rgba(80,255,140,0.7)",
        }} />
      )}
      {showHeat && count > 0 && (
        <div style={{
          position: "absolute", top: 3, right: 4, fontSize: 7.5, fontWeight: 600,
          lineHeight: 1, fontFamily: "monospace",
          color: count > maxHeat * 0.66 ? "rgba(255,175,175,0.9)" : count > maxHeat * 0.33 ? "rgba(255,215,100,0.85)" : "rgba(145,195,255,0.8)",
        }}>{count}</div>
      )}
      {icon
        ? <span style={{ color: fg, display: "flex" }}>{icon}</span>
        : <span style={{
          color: fg, fontFamily: "'SF Pro Text',-apple-system,sans-serif",
          fontWeight: mod ? 400 : 500,
          fontSize: !label ? 12 : label.length > 6 ? 7.5 : label.length > 3 ? 9 : label.length > 1 ? 10 : 12,
          letterSpacing: "-0.01em", lineHeight: 1,
        }}>{label}</span>
      }
    </div>
  );
}

function DualKey({ top, bot, keyCode, pressedKeys, onKeyPress, heatCounts, maxHeat, showHeat, ripples, onRipple, playSound }) {
  const isPressed = pressedKeys.has(keyCode);
  const count = heatCounts?.[keyCode] || 0;
  const heat = showHeat ? heatColor(count, maxHeat) : null;
  const myRipples = ripples.filter(r => r.keyCode === keyCode);

  function handleDown() { onKeyPress(keyCode, true); onRipple(keyCode); playSound(keyCode); }

  return (
    <div
      onMouseDown={handleDown}
      onMouseUp={() => onKeyPress(keyCode, false)}
      onMouseLeave={() => isPressed && onKeyPress(keyCode, false)}
      onTouchStart={e => { e.preventDefault(); handleDown(); }}
      onTouchEnd={() => onKeyPress(keyCode, false)}
      style={{
        width: B, height: B, minWidth: B, flexShrink: 0,
        position: "relative", overflow: "hidden", borderRadius: 7,
        cursor: "pointer", userSelect: "none",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "space-between", padding: "5px 0",
        transition: "transform 65ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 65ms ease",
        transform: isPressed ? "scale(0.92) translateY(2px)" : "scale(1)",
        background: isPressed ? "rgba(40,36,66,0.97)" : "rgba(48,44,76,0.88)",
        boxShadow: isPressed
          ? "inset 0 3px 8px rgba(0,0,0,0.65), 0 0 0 1px rgba(80,70,150,0.2)"
          : heat
            ? `0 3px 0 rgba(0,0,0,0.55), 0 5px 12px rgba(0,0,0,0.3), 0 0 0 1px rgba(110,100,190,0.28), inset 0 0 0 1000px ${heat}, inset 0 1px 0 rgba(255,255,255,0.07)`
            : "0 3px 0 rgba(0,0,0,0.55), 0 5px 12px rgba(0,0,0,0.3), 0 0 0 1px rgba(110,100,190,0.28), inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
    >
      {myRipples.map(r => (
        <span key={r.id} style={{
          position: "absolute", borderRadius: "50%", width: B * 2.5, height: B * 2.5,
          left: "50%", top: "50%", transform: "translate(-50%,-50%) scale(0)",
          background: "rgba(140,128,255,0.28)",
          animation: "kripple 480ms ease-out forwards", pointerEvents: "none",
        }} />
      ))}
      {showHeat && count > 0 && (
        <div style={{
          position: "absolute", top: 2, right: 3, fontSize: 7, fontWeight: 600,
          lineHeight: 1, fontFamily: "monospace",
          color: count > maxHeat * 0.66 ? "rgba(255,175,175,0.9)" : count > maxHeat * 0.33 ? "rgba(255,215,100,0.85)" : "rgba(145,195,255,0.8)",
        }}>{count}</div>
      )}
      <span style={{ color: "rgba(120,110,185,0.65)", fontSize: 8.5, lineHeight: 1, fontFamily: "'SF Pro Text',-apple-system,sans-serif" }}>{top}</span>
      <span style={{ color: isPressed ? "rgba(235,232,255,1)" : "rgba(200,196,245,0.85)", fontSize: 12, fontWeight: 600, lineHeight: 1, fontFamily: "'SF Pro Text',-apple-system,sans-serif" }}>{bot}</span>
    </div>
  );
}

function Arrow({ icon, keyCode, pressedKeys, onKeyPress, playSound, half = false }) {
  const isPressed = pressedKeys.has(keyCode);
  const h = half ? Math.floor((B - G) / 2) : B;
  return (
    <div
      onMouseDown={() => { onKeyPress(keyCode, true); playSound(keyCode); }}
      onMouseUp={() => onKeyPress(keyCode, false)}
      onMouseLeave={() => isPressed && onKeyPress(keyCode, false)}
      onTouchStart={e => { e.preventDefault(); onKeyPress(keyCode, true); playSound(keyCode); }}
      onTouchEnd={() => onKeyPress(keyCode, false)}
      style={{
        width: B, height: h, minWidth: B, flexShrink: 0,
        borderRadius: half ? 4 : 7, cursor: "pointer", userSelect: "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "transform 65ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 65ms ease",
        transform: isPressed ? "scale(0.88)" : "scale(1)",
        background: isPressed ? "rgba(40,36,66,0.97)" : "rgba(48,44,76,0.88)",
        boxShadow: isPressed
          ? "inset 0 3px 8px rgba(0,0,0,0.65)"
          : "0 3px 0 rgba(0,0,0,0.55), 0 0 0 1px rgba(110,100,190,0.28), inset 0 1px 0 rgba(255,255,255,0.07)",
        color: isPressed ? "rgba(200,196,255,0.95)" : "rgba(140,132,205,0.65)",
      }}
    >{icon}</div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function MacKeyboard() {
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [typed, setTyped] = useState("");
  const [heatCounts, setHeatCounts] = useState({});
  const [showHeat, setShowHeat] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [mode, setMode] = useState("type");
  const [soundOn, setSoundOn] = useState(true);
  const [soundProfile, setSoundProfile] = useState("tactile"); // tactile | clicky | soft
  const engineRef = useRef(null);

  // Lazy-init audio engine
  function getEngine() {
    engineRef.current = createAudioEngine(soundProfile);
    return engineRef.current;
  }

  // Volume / character multipliers per profile
  const profileGain = { tactile: 1.0, clicky: 1.45, soft: 0.55 };
  // We rebuild the engine per profile by recreating with gain scale baked in
  // (simpler: just call engine methods, gain is uniform per profile)

  const playSound = useCallback((keyCode) => {
    if (!soundOn) return;
    const eng = getEngine();
    const type = soundTypeFor(keyCode);
    // Apply profile volume by temporarily scaling — easiest: just call with gain wrapped
    const g = profileGain[soundProfile] ?? 1;
    // Re-invoke but we'll pass gain externally; for now engine has fixed gains
    // We recreate engine with gain param or just use separate engines
    // Simpler approach: separate function with gain multiplier
    playSoundWithGain(keyCode, g);
  }, [soundOn, soundProfile]);

  function playSoundWithGain(keyCode, gainMult) {
    try {
      if (!engineRef.current) engineRef.current = createAudioEngine();
      const ac = engineRef.current._getCtx ? engineRef.current._getCtx() : (() => {
        // inline ctx access
        return null;
      })();
    } catch (_) { }
    // Use the engine directly — simpler
    const eng = getEngine();
    const type = soundTypeFor(keyCode);
    eng[type]?.();
  }

  const maxHeat = Math.max(...Object.values(heatCounts), 1);

  const addRipple = useCallback((keyCode) => {
    const id = ++rippleId;
    setRipples(r => [...r, { id, keyCode }]);
    setTimeout(() => setRipples(r => r.filter(x => x.id !== id)), 520);
  }, []);

  const handleKeyPress = useCallback((keyCode, isDown) => {
    setPressedKeys(prev => { const n = new Set(prev); isDown ? n.add(keyCode) : n.delete(keyCode); return n; });
    if (isDown) {
      setHeatCounts(prev => ({ ...prev, [keyCode]: (prev[keyCode] || 0) + 1 }));
      addRipple(keyCode);
      const charMap = {
        Space: " ", Enter: "\n", Backspace: "__BACK__", Tab: "  ",
        ...Object.fromEntries("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(c => [`Key${c}`, c.toLowerCase()])),
        Digit0: "0", Digit1: "1", Digit2: "2", Digit3: "3", Digit4: "4",
        Digit5: "5", Digit6: "6", Digit7: "7", Digit8: "8", Digit9: "9",
        Minus: "-", Equal: "=", BracketLeft: "[", BracketRight: "]",
        Backslash: "\\", Semicolon: ";", Quote: "'", Comma: ",", Period: ".", Slash: "/", Backquote: "`",
      };
      if (charMap[keyCode] === "__BACK__") setTyped(t => t.slice(0, -1));
      else if (charMap[keyCode]) setTyped(t => (t + charMap[keyCode]).slice(-200));
    }
  }, [addRipple]);

  // Physical keyboard: play sound + handle press
  useEffect(() => {
    const dn = e => {
      e.preventDefault();
      if (soundOn) {
        const eng = getEngine();
        const type = soundTypeFor(e.code);
        eng[type]?.();
      }
      handleKeyPress(e.code, true);
    };
    const up = e => handleKeyPress(e.code, false);
    window.addEventListener("keydown", dn);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", dn); window.removeEventListener("keyup", up); };
  }, [handleKeyPress, soundOn]);

  const kp = { pressedKeys, onKeyPress: handleKeyPress, heatCounts, maxHeat, showHeat, ripples, onRipple: addRipple, playSound };
  const totalPresses = Object.values(heatCounts).reduce((a, b) => a + b, 0);
  const topKey = Object.entries(heatCounts).sort((a, b) => b[1] - a[1])[0]?.[0]?.replace("Key", "") || "—";
  const isSpacePressed = pressedKeys.has("Space");

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 22,
      background: "radial-gradient(ellipse at 38% 28%, #1c1640 0%, #0e0b22 50%, #07060f 100%)",
      padding: "32px 16px", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes kripple { to { transform:translate(-50%,-50%) scale(2.8); opacity:0; } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes orb1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-20px) scale(1.05)} }
        @keyframes orb2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,25px) scale(0.95)} }
      `}</style>

      {/* Ambient orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", width: 600, height: 600, borderRadius: "50%", top: "-15%", left: "5%",
          background: "radial-gradient(circle,rgba(90,60,200,0.1) 0%,transparent 65%)", animation: "orb1 12s ease-in-out infinite"
        }} />
        <div style={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%", bottom: "-10%", right: "8%",
          background: "radial-gradient(circle,rgba(50,100,220,0.07) 0%,transparent 65%)", animation: "orb2 16s ease-in-out infinite"
        }} />
      </div>

      {/* Title */}
      <div style={{ textAlign: "center", zIndex: 1, animation: "fadeUp 500ms ease both" }}>
        <div style={{
          fontSize: 9.5, letterSpacing: "0.25em", textTransform: "uppercase",
          color: "rgba(130,115,200,0.4)", fontWeight: 500, marginBottom: 5
        }}>Interactive</div>
        <div style={{ fontSize: 22, fontWeight: 200, color: "rgba(215,210,255,0.65)", letterSpacing: "-0.04em" }}>
          MacBook Keyboard
        </div>
      </div>

      {/* Controls row */}
      <div style={{
        display: "flex", gap: 10, alignItems: "center", zIndex: 1, flexWrap: "wrap", justifyContent: "center",
        animation: "fadeUp 500ms 60ms ease both"
      }}>

        {/* Mode toggle */}
        <div style={{
          display: "flex", gap: 2, background: "rgba(255,255,255,0.035)",
          borderRadius: 11, padding: 3, border: "1px solid rgba(255,255,255,0.05)"
        }}>
          {[["type", "⌨  Type"], ["heat", "◉  Heatmap"]].map(([m, label]) => (
            <button key={m} onClick={() => { setMode(m); setShowHeat(m === "heat"); }}
              style={{
                padding: "6px 16px", borderRadius: 9, border: "none", cursor: "pointer",
                fontSize: 10.5, fontWeight: 500, letterSpacing: "0.04em", transition: "all 200ms ease",
                background: mode === m ? "rgba(110,90,210,0.32)" : "transparent",
                color: mode === m ? "rgba(200,192,255,0.95)" : "rgba(130,120,185,0.45)",
                boxShadow: mode === m ? "0 0 0 1px rgba(140,118,240,0.22)" : "none",
              }}>{label}</button>
          ))}
        </div>

        {/* Sound toggle */}
        <button onClick={() => setSoundOn(s => !s)}
          title={soundOn ? "Mute" : "Enable sound"}
          style={{
            display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 9,
            border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer",
            background: soundOn ? "rgba(110,90,210,0.22)" : "rgba(255,255,255,0.03)",
            color: soundOn ? "rgba(190,180,255,0.85)" : "rgba(120,110,175,0.38)",
            fontSize: 10.5, fontWeight: 500, letterSpacing: "0.04em", transition: "all 200ms ease",
          }}>
          <span style={{ display: "flex" }}>{soundOn ? Ico.sound : Ico.mute}</span>
          {soundOn ? "Sound on" : "Muted"}
        </button>

        {/* Sound profile — only when sound is on */}
        {soundOn && (
          <div style={{
            display: "flex", gap: 2, background: "rgba(255,255,255,0.03)",
            borderRadius: 11, padding: 3, border: "1px solid rgba(255,255,255,0.05)"
          }}>
            {[["tactile", "Tactile"], ["clicky", "Clicky"], ["soft", "Soft"]].map(([p, label]) => (
              <button key={p} onClick={() => setSoundProfile(p)}
                style={{
                  padding: "5px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                  fontSize: 9.5, fontWeight: 500, letterSpacing: "0.04em", transition: "all 180ms ease",
                  background: soundProfile === p ? "rgba(100,80,200,0.28)" : "transparent",
                  color: soundProfile === p ? "rgba(190,182,255,0.9)" : "rgba(120,110,175,0.4)",
                }}>{label}</button>
            ))}
          </div>
        )}
      </div>

      {/* Typing display */}
      {mode === "type" && (
        <div style={{
          width: "100%", maxWidth: 780, background: "rgba(255,255,255,0.025)",
          borderRadius: 13, border: "1px solid rgba(255,255,255,0.05)",
          padding: "12px 18px", zIndex: 1, animation: "fadeUp 200ms ease both", minHeight: 68,
        }}>
          <div style={{
            fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(110,100,175,0.4)", marginBottom: 7
          }}>Output</div>
          <div style={{
            fontFamily: "'SF Mono','Fira Code',monospace", fontSize: 13.5,
            lineHeight: 1.65, color: "rgba(185,180,255,0.78)",
            whiteSpace: "pre-wrap", wordBreak: "break-all", minHeight: 22,
          }}>
            {typed || <span style={{ color: "rgba(110,100,170,0.28)", fontStyle: "italic", fontSize: 13 }}>start typing…</span>}
            <span style={{ animation: "blink 1.1s step-end infinite", color: "rgba(145,130,255,0.7)" }}>|</span>
          </div>
        </div>
      )}

      {/* Heatmap stats */}
      {mode === "heat" && (
        <div style={{ display: "flex", gap: 10, zIndex: 1, animation: "fadeUp 200ms ease both", flexWrap: "wrap", justifyContent: "center" }}>
          {[["Total", totalPresses], ["Unique keys", Object.keys(heatCounts).length], ["Top key", topKey]].map(([label, val]) => (
            <div key={label} style={{
              background: "rgba(255,255,255,0.025)", borderRadius: 11,
              border: "1px solid rgba(255,255,255,0.05)", padding: "10px 22px", textAlign: "center", minWidth: 96
            }}>
              <div style={{
                fontSize: 8.5, letterSpacing: "0.15em", textTransform: "uppercase",
                color: "rgba(110,100,170,0.4)", marginBottom: 5
              }}>{label}</div>
              <div style={{
                fontSize: 19, fontWeight: 300, color: "rgba(190,185,255,0.78)",
                fontFamily: "'SF Mono','Fira Code',monospace"
              }}>{val}</div>
            </div>
          ))}
          <button onClick={() => setHeatCounts({})} style={{
            background: "rgba(255,255,255,0.025)", borderRadius: 11, cursor: "pointer",
            border: "1px solid rgba(255,80,80,0.12)", padding: "10px 22px",
            fontSize: 10.5, color: "rgba(255,110,110,0.45)", transition: "all 180ms ease", letterSpacing: "0.04em",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "rgba(255,140,140,0.85)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,110,110,0.45)"}
          >Reset</button>
        </div>
      )}

      {/* ── KEYBOARD ── */}
      <div style={{
        position: "relative", zIndex: 1,
        background: "linear-gradient(168deg,#1a1528 0%,#120f20 45%,#0e0c1a 100%)",
        borderRadius: 19, padding: "14px 14px 18px",
        boxShadow: "0 55px 110px rgba(0,0,0,0.85), 0 18px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.045), 0 0 0 1px rgba(255,255,255,0.035)",
        animation: "fadeUp 500ms 120ms ease both",
      }}>
        <div style={{
          position: "absolute", top: 0, left: "18%", right: "18%", height: 1,
          background: "linear-gradient(90deg,transparent,rgba(150,130,255,0.13),transparent)"
        }} />

        <div style={{
          background: "linear-gradient(168deg,#0e0c1a 0%,#09080f 100%)", borderRadius: 12, padding: 10,
          boxShadow: "inset 0 2px 12px rgba(0,0,0,0.75),inset 0 0 0 1px rgba(0,0,0,0.5)"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: G }}>

            {/* Fn row */}
            <div style={{ display: "flex", gap: G, alignItems: "center" }}>
              <Key label="esc" keyCode="Escape" {...kp} mod />
              <div style={{ width: 10, flexShrink: 0 }} />
              {[["F1", "F1"], ["F2", "F2"], ["F3", "F3"], ["F4", "F4"]].map(([l, k]) => <Key key={k} label={l} keyCode={k} {...kp} mod />)}
              <div style={{ width: 6, flexShrink: 0 }} />
              {[["F5", "F5"], ["F6", "F6"], ["F7", "F7"], ["F8", "F8"]].map(([l, k]) => <Key key={k} label={l} keyCode={k} {...kp} mod />)}
              <div style={{ width: 6, flexShrink: 0 }} />
              {[["F9", "F9"], ["F10", "F10"], ["F11", "F11"], ["F12", "F12"]].map(([l, k]) => <Key key={k} label={l} keyCode={k} {...kp} mod />)}
            </div>

            {/* Number row */}
            <div style={{ display: "flex", gap: G, alignItems: "center" }}>
              <DualKey top="~" bot="`" keyCode="Backquote" {...kp} />
              {[["!", "1", "Digit1"], ["@", "2", "Digit2"], ["#", "3", "Digit3"], ["$", "4", "Digit4"],
              ["%", "5", "Digit5"], ["^", "6", "Digit6"], ["&", "7", "Digit7"], ["*", "8", "Digit8"],
              ["(", "9", "Digit9"], [")", 0, "Digit0"], ["_", "-", "Minus"], ["+", "=", "Equal"]].map(([t, b, k]) =>
                <DualKey key={k} top={t} bot={b} keyCode={k} {...kp} />)}
              <Key label="delete" keyCode="Backspace" {...kp} width={1.7} />
            </div>

            {/* QWERTY */}
            <div style={{ display: "flex", gap: G, alignItems: "center" }}>
              <Key label="tab" keyCode="Tab" {...kp} width={1.5} mod />
              {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map(l => <Key key={l} label={l} keyCode={`Key${l}`} {...kp} />)}
              <DualKey top="{" bot="[" keyCode="BracketLeft" {...kp} />
              <DualKey top="}" bot="]" keyCode="BracketRight" {...kp} />
              <DualKey top="|" bot="\\" keyCode="Backslash" {...kp} />
            </div>

            {/* ASDF */}
            <div style={{ display: "flex", gap: G, alignItems: "center" }}>
              <Key icon={Ico.caps} keyCode="CapsLock" {...kp} width={1.75} mod />
              {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map(l => <Key key={l} label={l} keyCode={`Key${l}`} {...kp} />)}
              <DualKey top=":" bot=";" keyCode="Semicolon" {...kp} />
              <DualKey top={'"'} bot="'" keyCode="Quote" {...kp} />
              <Key label="return" keyCode="Enter" {...kp} width={2.25} />
            </div>

            {/* ZXCV */}
            <div style={{ display: "flex", gap: G, alignItems: "center" }}>
              <Key icon={Ico.shift} label="shift" keyCode="ShiftLeft" {...kp} width={2.35} mod align="bottom" />
              {["Z", "X", "C", "V", "B", "N", "M"].map(l => <Key key={l} label={l} keyCode={`Key${l}`} {...kp} />)}
              <DualKey top="<" bot="," keyCode="Comma" {...kp} />
              <DualKey top=">" bot="." keyCode="Period" {...kp} />
              <DualKey top="?" bot="/" keyCode="Slash" {...kp} />
              <Key icon={Ico.shift} label="shift" keyCode="ShiftRight" {...kp} width={2.35} mod align="bottom" />
            </div>

            {/* Bottom row */}
            <div style={{ display: "flex", gap: G, alignItems: "center" }}>
              <Key label="fn" keyCode="Fn" {...kp} mod />
              <Key label="control" keyCode="ControlLeft" {...kp} width={1.15} mod />
              <Key icon={Ico.opt} label="option" keyCode="AltLeft" {...kp} width={1.15} mod />
              <Key icon={Ico.cmd} label="command" keyCode="MetaLeft" {...kp} width={1.5} mod />

              {/* Spacebar */}
              <div
                onMouseDown={() => { handleKeyPress("Space", true); addRipple("Space"); if (soundOn) { getEngine().space(); } }}
                onMouseUp={() => handleKeyPress("Space", false)}
                onMouseLeave={() => isSpacePressed && handleKeyPress("Space", false)}
                style={{
                  height: B, flexGrow: 1, flexShrink: 1, minWidth: 110,
                  borderRadius: 7, cursor: "pointer", position: "relative", overflow: "hidden",
                  transition: "transform 65ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 65ms ease",
                  transform: isSpacePressed ? "scale(0.97) translateY(2px)" : "scale(1)",
                  background: isSpacePressed ? "rgba(40,36,66,0.97)" : "rgba(48,44,76,0.88)",
                  boxShadow: isSpacePressed
                    ? "inset 0 3px 8px rgba(0,0,0,0.65), 0 0 0 1px rgba(80,70,150,0.2)"
                    : showHeat && heatCounts["Space"]
                      ? `0 3px 0 rgba(0,0,0,0.55), 0 5px 12px rgba(0,0,0,0.3), 0 0 0 1px rgba(110,100,190,0.28), inset 0 0 0 1000px ${heatColor(heatCounts["Space"] || 0, maxHeat)}, inset 0 1px 0 rgba(255,255,255,0.07)`
                      : "0 3px 0 rgba(0,0,0,0.55), 0 5px 12px rgba(0,0,0,0.3), 0 0 0 1px rgba(110,100,190,0.28), inset 0 1px 0 rgba(255,255,255,0.07)",
                }}
              >
                {ripples.filter(r => r.keyCode === "Space").map(r => (
                  <span key={r.id} style={{
                    position: "absolute", borderRadius: "50%", width: 220, height: 220,
                    left: "50%", top: "50%", transform: "translate(-50%,-50%) scale(0)",
                    background: "rgba(140,128,255,0.25)",
                    animation: "kripple 480ms ease-out forwards", pointerEvents: "none",
                  }} />
                ))}
                {showHeat && heatCounts["Space"] > 0 && (
                  <div style={{
                    position: "absolute", top: 4, right: 8, fontSize: 8, fontWeight: 600, fontFamily: "monospace",
                    color: heatCounts["Space"] > maxHeat * 0.66 ? "rgba(255,175,175,0.9)" : heatCounts["Space"] > maxHeat * 0.33 ? "rgba(255,215,100,0.85)" : "rgba(145,195,255,0.8)",
                  }}>{heatCounts["Space"]}</div>
                )}
              </div>

              <Key icon={Ico.cmd} label="command" keyCode="MetaRight" {...kp} width={1.5} mod />
              <Key icon={Ico.opt} label="option" keyCode="AltRight" {...kp} width={1.15} mod />

              <div style={{ display: "flex", gap: G, alignItems: "center" }}>
                <Arrow icon={Ico.lt} keyCode="ArrowLeft" pressedKeys={pressedKeys} onKeyPress={handleKeyPress} playSound={playSound} />
                <div style={{ display: "flex", flexDirection: "column", gap: G }}>
                  <Arrow icon={Ico.up} keyCode="ArrowUp" pressedKeys={pressedKeys} onKeyPress={handleKeyPress} playSound={playSound} half />
                  <Arrow icon={Ico.dn} keyCode="ArrowDown" pressedKeys={pressedKeys} onKeyPress={handleKeyPress} playSound={playSound} half />
                </div>
                <Arrow icon={Ico.rt} keyCode="ArrowRight" pressedKeys={pressedKeys} onKeyPress={handleKeyPress} playSound={playSound} />
              </div>
            </div>
          </div>
        </div>

        <div style={{
          textAlign: "center", marginTop: 9, fontSize: 8, letterSpacing: "0.2em",
          textTransform: "uppercase", color: "rgba(110,100,175,0.18)"
        }}>MacBook Pro</div>
      </div>

      <div style={{ fontSize: 9.5, color: "rgba(95,85,155,0.28)", letterSpacing: "0.13em", textTransform: "uppercase", zIndex: 1 }}>
        Click keys or use your physical keyboard
      </div>
    </div>
  );
}