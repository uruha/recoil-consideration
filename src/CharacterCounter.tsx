import React from 'react';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from 'recoil';

const textState = atom({
  key: 'textState',
  default: ''
});

function TextInput() {
  const [text, setText] = useRecoilState(textState);
  const textChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={textChange} />
      <p>
        Echo: {text}
      </p>
    </div>
  );
}

const charCountState = selector({
  key: 'charCountState',
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  }
});

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <p>Character Count: {count}</p>;
}

function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

export default CharacterCounter;
