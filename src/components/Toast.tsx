import { useEffect, useRef, useState } from 'react';

interface ToastProps {
  message: string;
  onDone: () => void;
}

export default function Toast({ message, onDone }: ToastProps) {
  const [visible, setVisible] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    // Single rAF to trigger CSS transition after first paint
    const frame = requestAnimationFrame(() => setVisible(true));
    const hide   = setTimeout(() => setVisible(false), 2500);
    const remove = setTimeout(() => onDoneRef.current(), 2900);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(hide);
      clearTimeout(remove);
    };
  }, []); // run once on mount — onDone is stable via ref

  return (
    <div className={`toast${visible ? ' toast--visible' : ''}`}>
      {message}
    </div>
  );
}
