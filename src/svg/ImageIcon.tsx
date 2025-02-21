const ImageIcon = ({
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
        d="M5.625 23.625h15.75a2.25 2.25 0 0 0 2.25-2.25V5.625a2.25 2.25 0 0 0-2.25-2.25H5.625a2.25 2.25 0 0 0-2.25 2.25v15.75a2.25 2.25 0 0 0 2.25 2.25m0 0L18 11.25l5.625 5.625M11.25 9.563a1.687 1.687 0 1 1-3.375 0 1.687 1.687 0 0 1 3.375 0"
        className={pathClassName}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ImageIcon;
