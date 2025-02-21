import { HTMLInputTypeAttribute } from 'react';

// TODO: necessary?

const TextInput = ({
  placeholder,
  state,
  setState,
  onChange,
  autoComplete,
  type,
  name,
}: {
  placeholder?: string;
  state: string;
  setState: (s: string) => void;
  onChange?: () => void;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  type: HTMLInputTypeAttribute;
  name: string;
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
      className="bg-inherit border-white/20 border-[1px] rounded-3xl py-2 px-4 w-full text-xl text-text-light placeholder:text-text-light/50"
      autoComplete={autoComplete}
      name={name}
    />
  );
};

export default TextInput;
