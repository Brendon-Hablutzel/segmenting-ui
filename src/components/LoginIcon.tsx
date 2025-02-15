const LoginIcon = ({ pathClassName }: { pathClassName?: string }) => {
  return (
    <svg
      width="162"
      height="162"
      viewBox="0 0 162 162"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M101.25 20.25H128.25C131.83 20.25 135.264 21.6723 137.796 24.2041C140.328 26.7358 141.75 30.1696 141.75 33.75V128.25C141.75 131.83 140.328 135.264 137.796 137.796C135.264 140.328 131.83 141.75 128.25 141.75H101.25M67.5 114.75L101.25 81M101.25 81L67.5 47.25M101.25 81H20.25"
        className={pathClassName}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LoginIcon;
