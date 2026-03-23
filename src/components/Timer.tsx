interface TimerProps {
  seconds: number;
}

export default function Timer({ seconds }: TimerProps) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return <span className="timer-display">{mm}:{ss}</span>;
}
