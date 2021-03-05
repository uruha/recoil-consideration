import React, { useCallback } from 'react';
import {
  atom,
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue
} from 'recoil';

const formTextState = atom({
  key: 'FormTextState',
  default: ''
});

const textInputValidateState = selectorFamily({
  key: 'TextInputValidateState',
  get: (boundaryValueOfInput: number) => ({ get }) => {
    return get(formTextState).length > boundaryValueOfInput ? false : true;
  }
});

const SimpleTextInputValidation = React.memo(() => {
  const validateResult = useRecoilValue(textInputValidateState(16));

  return validateResult ? null : <span>Validation Error !</span>;
});

const SimpleTextInput = () => {
  const [text, setText] = useRecoilState(formTextState);

  const inputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  return (
    <>
      <input type="text" value={text} onChange={inputText}/>
      <p>{text}</p>
      <SimpleTextInputValidation />
    </>
  );
};

const textInputStateFamily = atomFamily({
  key: 'TextInputStateFamily',
  default: ''
});

const textInputValidateStateFamily = atomFamily({
  key: 'TextInputValidateStateFamily',
  default: true
});

function CustomValidateInput(
  { formId, boundaryValue }:
  { formId: string, boundaryValue: number}
) {
  const [text, setText] = useRecoilState(textInputStateFamily(formId));
  const [validateResult, setValidateResult] = useRecoilState(textInputValidateStateFamily(formId));

  const validationJudgment = useRecoilCallback(({ snapshot }) => async () => {
    const currentText = await snapshot.getPromise(textInputStateFamily(formId));
    setValidateResult(currentText.length > boundaryValue ? false : true);
  });

  const inputText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    validationJudgment();
  }, []);

  return (
    <>
      <input type="text" value={text} onChange={inputText}/>
      <p>{text}</p>
      {!validateResult && <span>Validation Error !</span>}
    </>
  );
}

function Form() {
  return (
    <div>
      <SimpleTextInput />
      <CustomValidateInput formId="1" boundaryValue={16} />
      <CustomValidateInput formId="2" boundaryValue={8} />
    </div>
  );
}

export default Form;
