export const autoGrow = (element) => {
	if (!element) return;

	// Reset height to allow expansion
	element.style.height = "auto";

	// Set the new height up to a max limit (e.g., 400px)
	const newHeight = Math.min(element.scrollHeight, 400);
	element.style.height = `${newHeight}px`;

	// Add scrollbar if it exceeds max height
	element.style.overflowY = newHeight >= 400 ? "auto" : "hidden";
};
