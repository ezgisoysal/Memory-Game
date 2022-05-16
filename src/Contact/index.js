import { useEffect, useState } from "react";
import Card from './Card';
import items from '../redux/items.json';
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import {
  contactSelectors,
  updateCard,
  updateAll,
  deleteAll,
  addCard,
} from "../redux/cardSlice";



function Contact () {
  
  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  const doubledCards = items.concat(items);
  const shuffledCards = shuffle(doubledCards);
  
  const Cards = useSelector(contactSelectors.selectAll);
  const dispatch = useDispatch();

 
  const [openedCards, setOpenedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (openedCards.length === 2) {
      setTimeout(() => {
        if (openedCards[0].img === openedCards[1].img) {
          setMatchedCards([...matchedCards, openedCards]);
          setScore(score + 50);
        } else {
          dispatch(
            updateAll([
              {
                id: openedCards[0].id,
                img: items.img,
                complete: false,
                changes: {
                  close: true,
                },
              },
              {
                id: openedCards[1].id,
                img: items.img,
                complete: false,
                changes: {
                  close: true,
                },
              },
            ])
          );
          setScore(score - 10);
        }
        setOpenedCards([]);
      }, 750);
    }
  }, [openedCards]);

  //onClick card function
  const updateHandle = (item) => {
    if (openedCards.length === 2) return false;

    setOpenedCards([...openedCards, item]);

    dispatch(
      updateCard({
        id: item.id,
        img: item.img,
        complete: false,
        fail: false,
        changes: {
          close: false,
        },
      })
    );
  };

  // New Game button handler
  const shuffleHandler = () => {
    setLoading(true);
    dispatch(deleteAll());
    shuffle(Cards);
    setScore(0);
    setMatchedCards([]);
    setOpenedCards([]);
    shuffle(shuffledCards);
    setTimeout(() => {
      shuffledCards.map((item) => {
        dispatch(
          addCard({
            id: nanoid(2),
            img: item.img,
            close: true,
            complete: false,
          })
        );
      });
      setLoading(false);
    }, 200);
  };
  
  return (
    <>
      <div className="contact">
        <h1>Memory Game</h1>
        <h2>Score: {score}</h2>
        <button  onClick={() => {
            if (loading) return false;
            else shuffleHandler();
          }}>New Game
        </button>
      </div>
      <div className="playground">
        {Cards.map((item, i) => (
          <Card
            key={i}
            item={item}
            updateHandle={updateHandle}
          />
        ))}
      </div>
    </>
  )
}

export default Contact;