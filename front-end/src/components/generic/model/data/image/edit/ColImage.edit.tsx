import {
	get,
} from "lodash/fp";
import React, {
	RefObject,
	useEffect,
	useReducer,
	useState,
} from "react";

import ColLoading from "../../../../loading/ColLoading";
import { blobUrl } from "../../../../utils/blobs.utils";

import "../../ColData.edit.css";

import "./ColImage.edit.css";

enum EImageActionType {
	LoadImage = "LOAD_IMAGE",
	RemoveImage = "REMOVE_IMAGE",
	ResizeImage = "RESIZE_IMAGE",
	ResizeWindow = "RESIZE_WINDOW",
	RotateImage = "ROTATE_IMAGE",
	SetImageVisible = "TOGGLE_IMAGE_VISIBLE",
	SetImageWidthPercent = "SET_IMAGE_WIDTH_PERCENT",
}
interface IImageState {
	canvasRef: RefObject<HTMLCanvasElement>;
	imageBlob: Blob | undefined;
	imageFile: File | undefined;
	imageHeight: number;
	imageRef: RefObject<HTMLImageElement>;
	imageRemoved: boolean;
	imageRotating: boolean;
	imageVisible: boolean;
	imageWidth: number;
	imageWidthPercent: number;
	windowHeight: number;
	windowWidth: number;
}
interface IImageAction extends Partial<IImageState> {
	type: EImageActionType;
}

const imageState: IImageState = {
	canvasRef: React.createRef<HTMLCanvasElement>(),
	imageBlob: undefined,
	imageFile: undefined,
	imageHeight: 0,
	imageRef: React.createRef<HTMLImageElement>(),
	imageRemoved: false,
	imageRotating: false,
	imageVisible: false,
	imageWidth: 0,
	imageWidthPercent: 0,
	windowHeight: 0,
	windowWidth: 0,
};

const imageReducer: React.Reducer<Partial<IImageState>, IImageAction> =
	(state: Partial<IImageState>, action: IImageAction) => {
		switch (action.type) {
			case EImageActionType.LoadImage:
				return {
					...state,
					imageBlob: action.imageBlob,
					imageFile: action.imageFile,
				};
			case EImageActionType.RemoveImage:
				return {
					...state,
					imageBlob: undefined,
					imageFile: undefined,
					imageRemoved: action.imageRemoved,
				};
			case EImageActionType.ResizeImage:
				return {
					...state,
					imageHeight: action.imageHeight,
					imageWidth: action.imageWidth,
				};
			case EImageActionType.ResizeWindow:
				return {
					...state,
					windowHeight: action.windowHeight,
					windowWidth: action.windowWidth,
				};
			case EImageActionType.RotateImage:
				return {
					...state,
					imageRotating: action.imageRotating,
					imageVisible: false,
				};
			case EImageActionType.SetImageVisible:
				return {
					...state,
					imageRotating: false,
					imageVisible: action.imageVisible,
				};
			case EImageActionType.SetImageWidthPercent:
				return {
					...state,
					imageWidthPercent: action.imageWidthPercent,
				};
		}
	};

export default ({
	image,
	onChange = () => undefined,
}: {
	image: string,
	onChange: (value: string) => void,
}) => {
	const [state, dispatch] = useReducer(imageReducer, imageState);
	useEffect(createImageBlob(image, state, dispatch), [image]);
	useEffect(resetImageWidthPercent(dispatch), [state.imageBlob]);
	useEffect(resetImageVisible(dispatch), [state.imageFile, state.imageBlob]);
	useEffect(drawImage(state, dispatch, onChange), [state.imageWidthPercent]);
	useEffect(resizeWindow(dispatch), [state.windowHeight, state.windowWidth]);
	useEffect(resizeImage(state, dispatch), [
		state.imageVisible,
		state.windowWidth,
		state.windowHeight,
		state.imageHeight,
		state.imageWidth,
	]);
	useEffect(startRotatingImage(state, dispatch), [state.imageRotating]);
	useEffect(rotateImage(state, dispatch), [state.imageHeight, state.imageWidth]);
	useEffect(removeImage(state, dispatch), [state.imageRemoved]);
	const [imageInput, setImageInput] = useState<HTMLInputElement | null>();
	return (
		<>
			<p className="col-image-edit__file-name">
				{state.imageFile?.name}
			</p>
			<input type="button"
				className="col-image-edit__upload-button"
				value="upload image"
				onClick={() => !!imageInput && imageInput.click()}
			/>
			<input ref={(input) => setImageInput(input)}
				type="file"
				style={{
					display: "none",
				}}
				name="image"
				accept="image/*"
				onChange={(event: any) => dispatch({
					imageFile: event.target.files[0],
					type: EImageActionType.LoadImage,
				})}
			/>
			<input type="button" value="remove image"
				onClick={() => dispatch({
					imageRemoved: true,
					type: EImageActionType.RemoveImage,
				})}
			/>
			<canvas className="col-image-edit__canvas" ref={state.canvasRef}
				width={state.imageWidth}
				height={state.imageHeight}
				style={{ display: "none" }}
			/>
			{(!!state.imageFile || !!state.imageBlob?.size) &&
				<ColLoading loading={!state.imageVisible || state.imageRotating} fitChild={true}>
					<img className="col-image-edit__uploaded-image" ref={state.imageRef}
						style={{
							display: state.imageVisible ?
								"block" : "none",
							width: `${state.imageWidthPercent}%`,
						}}
						alt="uploaded profile"
						onLoad={() => {
							if (!state.imageVisible) {
								dispatch({
									imageHeight: get(["imageRef", "current", "height"], state),
									imageWidth: get(["imageRef", "current", "width"], state),
									type: EImageActionType.ResizeImage,
								});
							}
						}}
						src={blobUrl(state.imageFile || state.imageBlob)}
					/>
				</ColLoading>}
				<input className="col-image-edit__rotate-image"
					type="button"
					onClick={() => dispatch({
						imageRotating: true,
						type: EImageActionType.RotateImage,
					})}
					value="rotate right"
				/>
		</>
	);
};

const drawImage =
	(state: Partial<IImageState>, dispatch: React.Dispatch<IImageAction>, onChange: (value: string) => void) =>
		() => {
			if (!!state.imageWidthPercent) {
				if (!!state.imageFile && !!state.imageRef?.current && !!state.canvasRef?.current) {
					const imageCanvasNode = state.canvasRef.current;
					const uploadedImageNode = state.imageRef.current;
					const canvasContext = imageCanvasNode.getContext("2d");
					if (!canvasContext) {
						return;
					}
					canvasContext.drawImage(uploadedImageNode, 0, 0, state.imageWidth || 0, state.imageHeight || 0);
					imageCanvasNode.toBlob((imageBlob) => {
						if (!imageBlob) {
							return;
						}
						const fr = new FileReader();
						fr.onload = () => {
							const uploadedImage = btoa(`${fr.result}`);
							if (!!uploadedImage) {
								onChange(`data:image/jpeg;base64,${uploadedImage}`);
							}
						};
						fr.readAsBinaryString(imageBlob);
					}, "image/jpeg");
				}
				dispatch({
					imageVisible: true,
					type: EImageActionType.SetImageVisible,
				});
			}
		};

const createImageBlob =
	(image: string, state: Partial<IImageState>, dispatch: React.Dispatch<IImageAction>) =>
		() => {
			if (!state.imageBlob?.size && !state.imageRemoved) {
				if (!!image) {
					fetch(image)
						.then((res) => res.blob())
						.then((imageBlob) => dispatch({
							imageBlob,
							type: EImageActionType.LoadImage,
						}));
				}
			}
		};

const resizeWindow = (dispatch: React.Dispatch<IImageAction>) => {
	const updateWindowDimensions = () => dispatch({
		type: EImageActionType.ResizeWindow,
		windowHeight: window.innerHeight,
		windowWidth: window.innerWidth,
	});
	return () => {
		updateWindowDimensions();
		window.addEventListener("resize", updateWindowDimensions);
		return () => {
			window.removeEventListener("resize", updateWindowDimensions);
		};
	};
};

const resetImageVisible =
	(dispatch: React.Dispatch<IImageAction>) =>
		() => dispatch({
			imageVisible: false,
			type: EImageActionType.SetImageVisible,
		});

const resetImageWidthPercent =
	(dispatch: React.Dispatch<IImageAction>) =>
		() => {
			dispatch({
				imageWidthPercent: 0,
				type: EImageActionType.SetImageWidthPercent,
			});
		};

const resizeImage =
	(state: Partial<IImageState>, dispatch: React.Dispatch<IImageAction>) =>
		() => {
			const {
				imageWidth,
				imageHeight,
				imageVisible,
				windowWidth,
				windowHeight,
			} = state;
			if (!imageVisible &&
				!!imageWidth && !!imageHeight &&
				!!windowWidth && !!windowHeight
			) {
				const imageAspectRatio = imageWidth / imageHeight;
				const screenAspectRatio = windowWidth / windowHeight;
				const correctedImageAspectRatio = imageAspectRatio / screenAspectRatio;
				const imageWidthPercent = correctedImageAspectRatio * 100;
				dispatch({
					imageWidthPercent,
					type: EImageActionType.SetImageWidthPercent,
				});
			}
		};

const rotateImage =
	(state: Partial<IImageState>, dispatch: React.Dispatch<IImageAction>) =>
		() => {
			if (state.imageRotating) {
				// get canvas and image elements from page
				const imageCanvasNode = get(["canvasRef", "current"], state);
				const rotatingImage =  get(["imageRef", "current"], state);
				if (!imageCanvasNode || !rotatingImage) {
					return;
				}
				const canvasContext = imageCanvasNode.getContext("2d");
				// get whichever element actually exists
				// rotate the canvas, draw the image, and rotate the canvas back
				if (rotatingImage) {
					canvasContext.save();
					canvasContext.translate(
						imageCanvasNode.width / 2,
						imageCanvasNode.height / 2,
					);
					canvasContext.rotate(Math.PI / 2);
					canvasContext.translate(
						(-1 * imageCanvasNode.height / 2),
						(-1 * imageCanvasNode.width / 2),
					);
					canvasContext.drawImage(
						rotatingImage,
						0,
						0,
						state.imageHeight,
						state.imageWidth,
					);
					canvasContext.restore();
					imageCanvasNode.toBlob((imageBlob: Blob) => {
						dispatch({
							imageBlob,
							type: EImageActionType.LoadImage,
						});
					}, "image/jpeg", 1.0);
				}
			}
		};

const removeImage =
	(state: Partial<IImageState>, dispatch: React.Dispatch<IImageAction>) =>
		() => {
			if (state.imageRemoved) {
				dispatch({
					imageRemoved: false,
					type: EImageActionType.RemoveImage,
				});
			}
		};

const startRotatingImage =
	(state: Partial<IImageState>, dispatch: React.Dispatch<IImageAction>) =>
		() => {
			if (state.imageRotating) {
				dispatch({
					imageHeight: state.imageWidth,
					imageWidth: state.imageHeight,
					type: EImageActionType.ResizeImage,
				});
			}
		};
