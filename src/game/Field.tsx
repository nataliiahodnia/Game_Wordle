import { Keyboard } from "./Keyboard";

export const Field = () => {
  const handleBackspace = () => {
     console.log('bsp')
  };

  const handlePressed =(letter) => {
     console.log(letter)
  }


  return (
    <>
      <div>field</div>
      <Keyboard onPressed={handlePressed} onBackspace={handleBackspace} />
    </>
  );
};
