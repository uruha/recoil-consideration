import React from 'react';
import { RecoilRoot } from 'recoil';

import CharacterCounter from './CharacterCounter';
import Form from './Form';

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
      <Form />
    </RecoilRoot>
  );
}

export default App;
