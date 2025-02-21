const PowerIcon = ({
  svgClassName,
  pathClassName,
  strokeWidth,
}: {
  svgClassName?: string;
  pathClassName?: string;
  strokeWidth: string;
}) => {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={svgClassName}
    >
      <path
        d="M20.655 7.47a10.125 10.125 0 1 1-14.321 0M13.5 2.25V13.5"
        className={pathClassName}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PowerIcon;
