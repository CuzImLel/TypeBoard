import React from "react";

interface props {
  text: string;
}

const ErrorCard: React.FC<props> = ({ text }) => {
  return (
    <div className="errorcard">
      <span className="material-symbols-outlined">error</span>
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ErrorCard;
