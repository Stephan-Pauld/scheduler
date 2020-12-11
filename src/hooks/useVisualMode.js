
import { useState } from 'react'
import { renderHook, act } from "@testing-library/react-hooks";


export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  const transition = (newMode, replace) => {

    const newHistory = [...history];
    
    
    if (replace) {
      newHistory.pop()
    }
    
    newHistory.push(newMode);
    setHistory(newHistory);
    setMode(newMode);
    
  };
  
  const back = () => {

    if (history.length < 2) {
      return;
    }

    const newHistory = [...history];
    newHistory.pop();
    setMode(newHistory[newHistory.length - 1]);
    setHistory(newHistory);
    
  }
  return { mode, transition, back };
}
