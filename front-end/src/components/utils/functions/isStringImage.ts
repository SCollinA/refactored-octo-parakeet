export const imagePrefix = "data:image/jpeg;base64,";

export default (value: string): boolean => {
	return value.startsWith(imagePrefix);
};
