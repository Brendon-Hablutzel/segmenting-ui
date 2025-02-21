const HomeIcon = ({
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
        d="M10.125 24.75V13.5h6.75v11.25m-13.5-14.625L13.5 2.25l10.125 7.875V22.5a2.25 2.25 0 0 1-2.25 2.25H5.625a2.25 2.25 0 0 1-2.25-2.25z"
        className={pathClassName}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HomeIcon;
