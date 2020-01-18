import { get } from "lodash/fp";
import React, { useState, createRef, useReducer, useEffect, RefObject } from "react";

import { blobUrl } from "../../../utils/blobs.utils";

import "../../ColInput.css";

import "./ColImage.input.css";
import ColLoading from "../../../loading/ColLoading";

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
	imageFile: File | Blob | undefined;
	imageHeight: number;
	imageRef: RefObject<HTMLImageElement>;
	imageRemoved: boolean;
	imageRotated: boolean;
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
	imageFile: undefined,
	imageHeight: 0,
	imageRef: React.createRef<HTMLImageElement>(),
	imageRemoved: false,
	imageRotated: false,
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
					imageFile: action.imageFile,
					imageWidthPercent: 0,
				};
			case EImageActionType.RemoveImage:
				return {
					...state,
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
					imageRotated: action.imageRotated,
				};
			case EImageActionType.SetImageVisible:
				return {
					...state,
					imageRotated: false,
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
}: {
	image: string | File,
}) => {
	const [state, dispatch] = useReducer(imageReducer, imageState);
	useEffect(loadInitialImage(image, state, dispatch), [image]);
	useEffect(resizeWindow(dispatch), [state.windowHeight, state.windowWidth]);
	useEffect(() => dispatch({
		imageVisible: false,
		type: EImageActionType.SetImageVisible,
	}), [state.imageFile]);
	useEffect(resizeImage(state, dispatch), [
		state.imageVisible,
		state.windowWidth,
		state.windowHeight,
		state.imageHeight,
		state.imageWidth,
	]);
	useEffect(() => {
		if (!!state.imageWidthPercent) {
			dispatch({
				imageVisible: true,
				type: EImageActionType.SetImageVisible,
			});
		}
	}, [state.imageWidthPercent]);
	useEffect(() => {
		if (state.imageRotated) {
			dispatch({
				imageHeight: state.imageWidth,
				imageWidth: state.imageHeight,
				type: EImageActionType.ResizeImage,
			});
		}
	}, [state.imageRotated]);
	useEffect(rotateImage(state, dispatch), [state.imageHeight, state.imageWidth]);
	useEffect(removeImage(state, dispatch), [state.imageRemoved]);
	return (
		<>
			<input type="file"
				name="image"
				accept="image/*"
				onChange={(event: any) => dispatch({
					imageFile: event.target.files[0],
					type: EImageActionType.LoadImage,
				})}
			/>
			<input type="button" value="remove image"
				onClick={(event) => dispatch({
					imageRemoved: true,
					type: EImageActionType.RemoveImage,
				})}
			/>
			<canvas id="imageCanvas" ref={state.canvasRef}
				width={state.imageWidth}
				height={state.imageHeight}
				style={{ display: "none" }}
			/>
			{!!state.imageFile &&
				<ColLoading loading={!state.imageVisible || !!state.imageRotated} fitChild={true}>
					<img id="uploadedImage" ref={state.imageRef}
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
						src={blobUrl(state.imageFile)}
					/>
				</ColLoading>}
				<input className="col-input-image__rotate-image"
					type="button"
					onClick={() => dispatch({
						imageRotated: true,
						type: EImageActionType.RotateImage,
					})}
					value="rotate right"
				/>
		</>
	);
};

const loadInitialImage =
	(image: string | File, state: Partial<IImageState>, dispatch: React.Dispatch<IImageAction>) =>
		() => {
			if (!state.imageFile && !state.imageRemoved) {
				if (!!image) {
					if (typeof image === "string") {
						fetch(`data:image/jpeg;base64,${image}`)
							.then((res) => res.blob())
							.then((stuff) => {
								return stuff;
							})
							.then((imageFile) => dispatch({
								imageFile,
								type: EImageActionType.LoadImage,
							}));
					}
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

const resizeImage =
	(state: Partial<IImageState>, dispatch: React.Dispatch<IImageAction>) =>
		() => {
			const { imageWidth, imageHeight, windowWidth, windowHeight } = state;
			if (!state.imageVisible &&
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
			if (state.imageRotated) {
				// get canvas and image elements from page
				const imageCanvasNode = get(["canvasRef", "current"], state);
				const rotatingImage =  get(["imageRef", "current"], state);
				if (!imageCanvasNode || rotatingImage) {
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
					imageCanvasNode.toBlob((imageBlob: any) => {
						dispatch({
							imageFile: imageBlob,
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
