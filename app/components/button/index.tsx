import React from "react";
import styles from "./styles.module.css";

export const Button = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
	return <button {...props} ref={ref} className={styles.root} />;
});
Button.displayName = "Button";
