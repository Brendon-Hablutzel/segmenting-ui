const UploadCloudIcon = ({
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
      width="162"
      height="162"
      viewBox="0 0 162 162"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={svgClassName}
    >
      <path
        d="M108 108L81 81M81 81L54 108M81 81V141.75M137.633 124.133C144.216 120.543 149.417 114.864 152.414 107.991C155.411 101.117 156.034 93.4418 154.185 86.1752C152.335 78.9085 148.119 72.4647 142.2 67.8608C136.282 63.2568 128.998 60.755 121.5 60.75H112.995C110.952 52.8474 107.144 45.5108 101.857 39.2917C96.5705 33.0727 89.9427 28.133 82.4722 24.8441C75.0016 21.5552 66.8827 20.0027 58.7258 20.3032C50.5689 20.6038 42.5862 22.7495 35.3779 26.5793C28.1697 30.409 21.9234 35.823 17.1087 42.4142C12.294 49.0054 9.03616 56.6024 7.58011 64.6339C6.12407 72.6655 6.50771 80.9226 8.70219 88.7845C10.8967 96.6465 14.8449 103.909 20.25 110.025"
        className={pathClassName}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UploadCloudIcon;
