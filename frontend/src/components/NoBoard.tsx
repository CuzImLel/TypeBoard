import React from "react";

const NoBoard: React.FC = () => {
  return (
    <div
      className="noboard"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h1 style={{ fontSize: "50px", color: "var(--dark_text)" }}>
        Select or create a Board to continue! 😴
      </h1>
    </div>
  );
};

export default NoBoard;
