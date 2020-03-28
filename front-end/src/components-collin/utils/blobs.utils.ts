
// For image uploading
const urls = new WeakMap();
export const blobUrl = (blob: any) => {
	if (urls.has(blob)) {
		return urls.get(blob);
	} else {
		const url = URL.createObjectURL(blob);
		urls.set(blob, url);
		return url;
	}
};
