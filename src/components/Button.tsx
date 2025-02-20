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
  const conditionalStyles =
    kind === 'primary'
      ? !disabled
        ? 'bg-text-light text-text-dark hover:cursor-pointer hover:brightness-75' // primary enabled
        : 'bg-text-light text-text-dark brightness-50 hover:cursor-not-allowed' // primary disabled
      : kind === 'secondary'
        ? !disabled
          ? 'border-[0.5px] border-text-light text-text-light' // secondary enabled
          : 'border-[0.5px] border-text-light text-text-light brightness-50' // secondary disabled
        : !disabled
          ? '' // TODO: tertiary enabled
          : ''; // TODO: tertiary disabled

  return (
    <button
      className={`${conditionalStyles} select-none transition ease-out duration-150 active:scale-99 rounded-3xl w-full h-[3rem] text-2xl`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <div className="relative flex justify-center items-center">
        {isLoading ? (
          <span className="flex gap-2 items-center">
            <span>{text}</span>
            <Puff
              className="absolute right-2"
              stroke={kind === 'primary' ? 'black' : 'white'}
            />
          </span>
        ) : (
          text
        )}
      </div>
    </button>
  );
};

export default Button;
