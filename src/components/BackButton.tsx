import { Link } from 'react-router-dom';

const BackButton = ({ to }: { to: string }) => {
  return (
    <Link
      to={to}
      className="text-text-primary hover:cursor-pointer w-12 h-6 text-center"
    >
      Back
    </Link>
  );
};

export default BackButton;
