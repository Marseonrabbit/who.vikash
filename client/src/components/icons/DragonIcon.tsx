interface DragonIconProps {
  className?: string;
}

const DragonIcon = ({ className = "" }: DragonIconProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M400 100C350 120 330 150 320 200C310 250 305 270 300 300C295 330 290 350 280 380C270 410 260 430 240 450C220 470 200 480 170 500C140 520 125 530 100 550"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1 1"
        strokeDashoffset="0"
      />
      <path
        d="M400 100C420 110 430 115 450 120C470 125 480 127.5 500 130C520 132.5 530 133.75 550 135C570 136.25 580 136.875 600 137.5C620 138.125 630 138.4375 650 138.75C670 139.0625 680 139.2188 700 139.375"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1 1"
        strokeDashoffset="0"
      />
      <path
        d="M400 100C420 90 430 85 450 80C470 75 480 72.5 500 70C520 67.5 530 66.25 550 65C570 63.75 580 63.125 600 62.5"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1 1"
        strokeDashoffset="0"
      />
      <path
        d="M350 200C360 190 365 185 375 180C385 175 390 172.5 400 170C410 167.5 415 166.25 425 165C435 163.75 440 163.125 450 162.5"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1 1"
        strokeDashoffset="0"
      />
      <path
        d="M400 100C370 150 355 175 340 230C325 285 317.5 312.5 310 370C302.5 427.5 298.75 456.25 295 515C291.25 573.75 289.375 603.125 287.5 662.5"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1 1"
        strokeDashoffset="0"
      />
    </svg>
  );
};

export default DragonIcon;
