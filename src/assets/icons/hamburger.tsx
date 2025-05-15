import React from "react";

export default function Hamburger({
	className,
	...props
}: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			className={className}
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M4.80005 7.9999C4.80005 7.11625 5.51639 6.3999 6.40005 6.3999H25.6C26.4837 6.3999 27.2001 7.11625 27.2001 7.9999C27.2001 8.88356 26.4837 9.5999 25.6 9.5999H6.40005C5.51639 9.5999 4.80005 8.88356 4.80005 7.9999Z"
				fill="#8D98AF"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M4.80005 15.9999C4.80005 15.1162 5.51639 14.3999 6.40005 14.3999H16C16.8837 14.3999 17.6 15.1162 17.6 15.9999C17.6 16.8836 16.8837 17.5999 16 17.5999H6.40005C5.51639 17.5999 4.80005 16.8836 4.80005 15.9999Z"
				fill="#8D98AF"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M4.80005 23.9999C4.80005 23.1162 5.51639 22.3999 6.40005 22.3999H25.6C26.4837 22.3999 27.2001 23.1162 27.2001 23.9999C27.2001 24.8836 26.4837 25.5999 25.6 25.5999H6.40005C5.51639 25.5999 4.80005 24.8836 4.80005 23.9999Z"
				fill="#8D98AF"
			/>
		</svg>
	);
}
