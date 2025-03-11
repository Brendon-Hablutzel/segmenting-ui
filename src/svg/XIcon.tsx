const XIcon: React.FC<
  React.SVGProps<SVGElement> & {
    size: number;
    svgClassName?: string;
    pathClassName?: string;
  }
> = ({ size, svgClassName, pathClassName }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={size}
    height={size}
    version="1.1"
    viewBox="0 0 460.775 460.775"
    className={svgClassName}
  >
    <path
      className={pathClassName}
      d="M285.08 230.397 456.218 59.27c6.076-6.077 6.076-15.911 0-21.986L423.511 4.565a15.55 15.55 0 0 0-21.985 0l-171.138 171.14L59.25 4.565a15.55 15.55 0 0 0-21.985 0L4.558 37.284c-6.077 6.075-6.077 15.909 0 21.986l171.138 171.128L4.575 401.505c-6.074 6.077-6.074 15.911 0 21.986l32.709 32.719a15.555 15.555 0 0 0 21.986 0l171.117-171.12 171.118 171.12a15.55 15.55 0 0 0 21.985 0l32.709-32.719c6.074-6.075 6.074-15.909 0-21.986z"
    ></path>
  </svg>
);

export default XIcon;
