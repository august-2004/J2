export const autoGrow = (textAreaRef) => {
	const { current } = textAreaRef;
	current.style.height = "auto";
	const newHeight = Math.min(Math.max(current.scrollHeight, 200), 500);
	current.style.height = newHeight + "px";
	current.style.overflow = newHeight >= 500 ? "auto" : "hidden";
};
