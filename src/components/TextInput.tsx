const TextInput = ({
  isPasswordInput,
  placeholder,
  state,
  setState,
  onChange,
  autoComplete,
}: {
  isPasswordInput?: boolean;
  placeholder?: string;
  state: string;
  setState: (s: string) => void;
  onChange?: () => void;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
}) => {
  return (
    <input
      value={state}
      onChange={(e) => {
        onChange?.();
        setState(e.target.value);
      }}
      type={isPasswordInput ? 'password' : 'text'}
      placeholder={placeholder}
      className="border-text-primary/50 text-text-primary transition focus:border-text-primary border-[1px] rounded-2xl w-[30rem] h-[3rem] text-2xl p-5 focus:outline-none"
      autoComplete={autoComplete}
    />
  );
};

export default TextInput;
