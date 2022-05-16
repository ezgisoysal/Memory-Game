import React from 'react';

function Card({ item, updateHandle }) {

  return (
    <div onClick={() => {
      if (item.close === false || item.complete === true) {
        return false;
      } else {
        updateHandle(item);
      }
      }}
      className={
        item.close === false || item.complete === true
          ? "card opened"
          : "card"}
    >
        <div className="front">X</div>
        <div className="back">
          <img src={item.img} alt={item.name} />
        </div>
    </div>
  )
}

export default Card;