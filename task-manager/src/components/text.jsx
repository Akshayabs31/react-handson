import { useState } from 'react';

export  function Text() {
  const [msg, setMsg] = useState("");

  const handleMsg = (k) => {
    setMsg(k.target.value);
  };

  return (
    <>
      <input onChange={handleMsg} />
      <p>{msg}</p>
    </>
  );
}
