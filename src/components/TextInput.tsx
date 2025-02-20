import { HTMLInputTypeAttribute } from 'react';

const TextInput = ({
  placeholder,
  state,
  setState,
  onChange,
  autoComplete,
  type,
}: {
  placeholder?: string;
  state: string;
  setState: (s: string) => void;
  onChange?: () => void;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  type: HTMLInputTypeAttribute;
}) => {
  return (
    <input
      value={state}
      onChange={(e) => {
        onChange?.();
        setState(e.target.value);
      }}
      type={type}
      placeholder={placeholder}
      className="bg-inherit border-white/20 border-[1px] rounded-3xl py-2 px-4 w-full text-2xl text-text-light placeholder:text-text-light/50"
      autoComplete={autoComplete}
    />
  );
};

export default TextInput;
