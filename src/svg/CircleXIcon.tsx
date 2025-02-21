const CircleXIcon = ({
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
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
      className={svgClassName}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        className={pathClassName}
        strokeWidth={strokeWidth}
        d="M30 18 18 30m0-12 12 12m14-6c0 11.046-8.954 20-20 20S4 35.046 4 24 12.954 4 24 4s20 8.954 20 20"
      />
    </svg>
  );
};

export default CircleXIcon;
