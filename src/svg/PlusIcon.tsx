const PlusIcon = ({
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
        d="M13.5 9v9M9 13.5h9m6.75 0c0 6.213-5.037 11.25-11.25 11.25S2.25 19.713 2.25 13.5 7.287 2.25 13.5 2.25 24.75 7.287 24.75 13.5"
        className={pathClassName}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlusIcon;
