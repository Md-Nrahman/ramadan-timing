import React from "react";

const TimerBox = ({ time, title, color }) => {
  const returnVal = () => {
    switch (title) {
      case "ঘণ্টা":
        return Math.floor(time / 3600000);

      case "মিনিট":
        return Math.floor(time / 60000) - (Math.floor(time / 3600000) * 60);

      case "সেকেন্ড":
        return Math.floor(time / 1000) - (Math.floor(time / 60000) * 60);

      default:
        break;
    }
  };

  const getClassname = () => {
   
    switch (title) {
        case "ঘণ্টা":
          return "box-1";
  
        case "মিনিট":
          return "box-2";
  
        case "সেকেন্ড":
          return "box-3";
  
        default:
          break;
      }
  
}


  return (
    <div className={getClassname()}>
      <p style={{ color: "#f4f4f4" }} className="mash">
        <strong>{title}</strong>
      </p>
      <h2 id="hours" style={{ fontSize: 30, color: color }}>
        {returnVal()}
      </h2>
    </div>
  );
};

export default React.memo(TimerBox);
