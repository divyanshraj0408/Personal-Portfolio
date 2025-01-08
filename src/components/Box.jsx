const Box = () => {
  return (
    <>
      <div
        className="absolute -inset-3 rounded-t-2xl bg-[rgba(255,255,255,0.1)] backdrop-blur-md -z-10"
        style={{
          borderTop: "2px solid rgba(255,255,255,0.2)",
          borderLeft: "2px solid rgba(255,255,255,0.2)",
          borderRight: "2px solid rgba(255,255,255,0.2)",
          borderBottom: "2px solid rgba(255,255,255,0.2)",
        }}
      ></div>
    </>
  );
};
export default Box;
