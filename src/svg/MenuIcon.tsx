const MenuIcon: React.FC<
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
    viewBox="0 0 32 32"
    className={svgClassName}
  >
    <path
      className={pathClassName}
      d="M4 10h24a2 2 0 0 0 0-4H4a2 2 0 0 0 0 4m24 4H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4m0 8H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4"
    ></path>
  </svg>
);

export default MenuIcon;
