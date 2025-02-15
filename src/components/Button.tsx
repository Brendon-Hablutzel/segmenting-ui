import { Puff } from 'react-loading-icons';

const Button = ({
  text,
  kind,
  onClick,
  isLoading,
  disabled,
  type,
}: {
  text: string;
  kind: 'primary' | 'secondary' | 'tertiary';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
}) => {
  const kindStyle =
    kind === 'primary'
      ? 'bg-bg-primary'
      : kind === 'secondary'
        ? 'border-text-primary border-[1px] hover:bg-bg-primary/5 '
        : '';

  const disabledConditionalStyle = disabled
    ? 'brightness-50 hover:cursor-not-allowed'
    : 'hover:brightness-110 hover:cursor-pointer';

  return (
    <button
      className={`${kindStyle} ${disabledConditionalStyle} focus:outline-text-primary focus:outline-1 text-text-primary select-none transition ease-in-out active:scale-99 hover:shadow-[3px_3px_10px_rgba(0,0,0,0.5)] shadow-[3px_3px_10px_rgba(0,0,0,0.25)] rounded-3xl w-[20rem] lg:w-[30rem] h-[3rem] text-2xl`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <div className="relative flex justify-center items-center">
        {isLoading ? (
          <span className="flex gap-2 items-center">
            <span>{text}</span>
            <Puff className="absolute right-2" />
          </span>
        ) : (
          text
        )}
      </div>
    </button>
  );
};

export default Button;
