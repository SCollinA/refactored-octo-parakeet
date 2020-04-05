import {
	get,
	throttle,
} from "lodash/fp";
import React, {
	RefObject,
	useEffect,
	useReducer,
	useState,
} from "react";

import ColButton from "../../../../buttons/ColButton";
import ColLoading from "../../../../loading/ColLoading";
import { blobUrl } from "../../../../utils/blobs.utils";

import "../../ColData.edit.scss";

import "./ColImage.edit.scss";

enum EImageActionType {
	LoadImage = "LOAD_IMAGE",
	EmitImage = "EMIT_IMAGE",
	RemoveImage = "REMOVE_IMAGE",
	SetImageDimensions = "SET_IMAGE_DIMENSIONS",
	ResizeWindow = "RESIZE_WINDOW",
	// RotateImage = "ROTATE_IMAGE",
	SetImageWidthPercent = "SET_IMAGE_WIDTH_PERCENT",
}
interface IImageState {
	image: Blob | File | undefined;
	imageHeight: number;
	// imageRotating: boolean;
	imageUploaded: boolean;
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
	image: undefined,
	imageHeight: 0,
	// imageRotating: false,
	imageUploaded: false,
	imageVisible: false,
	imageWidth: 0,
	imageWidthPercent: 1,
	windowHeight: 0,
	windowWidth: 0,
};

const imageReducer: React.Reducer<Partial<IImageState>, IImageAction> =
	(state: Partial<IImageState>, action: IImageAction) => {
		switch (action.type) {
			case EImageActionType.LoadImage:
			// Reset image width when blob changes (initial load or image rotation)
			// Set image not visible in order to get natural dimensions after image changes
				console.log("load image changed", action)
				return {
					...state,
					image: action.image,
					imageUploaded: action.imageUploaded,
					imageVisible: false,
					imageWidthPercent: 0,
					// imageRotating: false,
				};
			case EImageActionType.SetImageDimensions:
				console.log("resize image changed", action)
				return {
					...state,
					imageHeight: action.imageHeight,
					imageWidth: action.imageWidth,
				};
			case EImageActionType.SetImageWidthPercent:
				console.log("image width percent changed", action)
				return {
					...state,
					imageVisible: true,
					imageRotating: false,
					imageWidthPercent: action.imageWidthPercent,
				};
			case EImageActionType.EmitImage:
				console.log("emitting image action");
				return {
					...state,
					imageUploaded: false,
				}
			case EImageActionType.ResizeWindow:
				console.log("resize window changed", action)
				return {
					...state,
					windowHeight: action.windowHeight,
					windowWidth: action.windowWidth,
				};
			case EImageActionType.RemoveImage:
				console.log("remove image changed", action)
				return {
					...state,
					imageUploaded: true,
					imageVisible: true,
					image: undefined,
					imageWidth: 0,
					imageHeight: 0,
					imageWidthPercent: 1,
				};
			// case EImageActionType.RotateImage:
			// 	console.log("rotate image changed", action)
			// 	return {
			// 		...state,
			// 		imageRotating: action.imageRotating,
			// 		imageWidth: state.imageHeight,
			// 		imageHeight: state.imageWidth,
			// 	};
		}
	};

export default ({
	image,
	onChange = () => undefined,
}: {
	image: string,
	onChange: (value: string) => void,
}) => {
	let imageInput: HTMLInputElement;
	const imageRef =  React.createRef<HTMLImageElement>();
	const canvasRef =  React.createRef<HTMLCanvasElement>();
	const [state, dispatch] = useReducer(imageReducer, imageState);
	// Initialize window dimensions observers
	useEffect(resizeWindow(dispatch), []);
	console.log("rendering col image edit", state);
	// Step 1: Create image blob from existing image value
	useEffect(createImageBlobIfNotExists(image, state, dispatch), [image]);
	// Get scaled image width if not loaded yet
	useEffect(getImageWidthPercent(state, dispatch), [
		state.imageVisible,
		state.windowWidth,
		state.windowHeight,
		state.imageHeight,
		state.imageWidth,
	]);
	// Emit image when loaded
	useEffect(emitImage(
		state,
		dispatch,
		imageRef,
		canvasRef,
		onChange,
	), [state.imageUploaded, state.imageVisible]);
	// useEffect(rotateImage(state, dispatch, imageRef, canvasRef), [state.imageRotating]);
	return (
		<div className="col-data-edit col-image-edit">
			<p className="col-image-edit__file-name">
				{state.image instanceof File && state.image?.name}
			</p>
			<div className="col-image-edit__actions">
				<ColButton type="button"
					value="upload image"
					action={() => !!imageInput && imageInput.click()}
				/>
				<input ref={(input) => !!input && (imageInput = input)}
					type="file"
					style={{ display: "none" }}
					name="image"
					accept="image/*"
					onChange={(event: any) => {
						console.log("file input new value")
						dispatch({
						image: event.target.files[0],
						imageUploaded: true,
						type: EImageActionType.LoadImage,
					})}}
				/>
				<ColButton type="button" value="remove image"
					action={() => {
						dispatch({ type: EImageActionType.RemoveImage });
					}}
				/>
				{/* <ColButton type="button"
					action={() => dispatch({
						imageRotating: true,
						type: EImageActionType.RotateImage,
					})}
					value="rotate right"
				/> */}
			</div>
			<canvas className="col-image-edit__canvas" ref={canvasRef}
				width={state.imageWidth}
				height={state.imageHeight}
				style={{ display: "none" }}
			/>
			{/* imageFile is uploaded file, imageBlob is original or rotated image */}
			{!!state.image &&
				// While image not visible or rotating, show loader
				// <ColLoading loading={!state.imageLoaded || state.imageRotating} fitChild={true}>
				<ColLoading loading={!state.imageVisible} fitChild={true}>
					{/* Load image as not visible to get natural dimensions */}
					{state.imageVisible &&
						// Showing image
						<img className="col-image-edit__uploaded-image"
							style={{
								display: "block",
								width: `${(state.imageWidthPercent || 1) * 100}%`,
							}}
							alt="uploaded image"
							src={blobUrl(state.image)}
						/>}
					{/* // Getting image natural dimensions */}
					<img className="col-image-edit__hidden-image" ref={imageRef}
						style={{
							display: "none",
							width: "unset",
						}}
						alt="natural image"
						// Step 2: Resize image on load using natural dimensions
						onLoad={() => {
							console.log("hidden img element loaded")
							dispatch({
							imageHeight: get(["current", "height"], imageRef),
							imageWidth: get(["current", "width"], imageRef),
							type: EImageActionType.SetImageDimensions,
						})}}
						src={blobUrl(state.image)}
					/>
				</ColLoading>}
		</div>
	);
};

const emitImage = (
	state: Partial<IImageState>,
	dispatch: React.Dispatch<IImageAction>,
	imageRef: RefObject<HTMLImageElement>,
	canvasRef: RefObject<HTMLCanvasElement>,
	onChange: (value: string) => void,
) => () => {
		console.log("emitting image maybe")
		if (state.imageUploaded && state.imageVisible) {
			console.log("emitting image")
			if (!!canvasRef?.current && !!imageRef?.current) {
				const imageCanvasNode = canvasRef.current;
				const uploadedImageNode = imageRef.current;
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
							dispatch({ type: EImageActionType.EmitImage })
						}
					};
					fr.readAsBinaryString(imageBlob);
				}, "image/jpeg");
			} else {
				onChange("");
				dispatch({ type: EImageActionType.EmitImage })
			}
		}
	};

const getImageWidthPercent =
	(state: Partial<IImageState>, dispatch: React.Dispatch<IImageAction>) =>
		() => {
			const {
				imageWidth,
				imageWidthPercent,
				imageHeight,
				windowWidth,
				windowHeight,
			} = state;
			console.log("getting image width percent maybe")
			if (
				!!imageWidth && !!imageHeight &&
				!!windowWidth && !!windowHeight
			) {
				console.log("getting image width percent")
				const aspectRatio = imageWidth / imageHeight;
				let newWidth = imageWidth;
				let newHeight = imageHeight;
				newWidth = window.innerWidth;
				newHeight = newWidth / aspectRatio;
				newHeight = window.innerHeight;
				newWidth = aspectRatio * newHeight;
				let newImageWidthPercent = (newWidth / imageWidth) * (imageWidthPercent || 1);
				if (newImageWidthPercent > 1) {
					newImageWidthPercent = 1;
				}
				dispatch({
					imageWidthPercent: newImageWidthPercent,
					type: EImageActionType.SetImageWidthPercent,
				});
			}
		};

// const rotateImage = (
// 	state: Partial<IImageState>,
// 	dispatch: React.Dispatch<IImageAction>,
// 	imageRef: RefObject<HTMLImageElement>,
// 	canvasRef: RefObject<HTMLCanvasElement>,
// ) =>
// 	() => {
// 		if (state.imageRotating && !!canvasRef?.current && !!imageRef?.current) {
// 			// get canvas and image elements from page
// 			const imageCanvasNode = get(["current"], canvasRef);
// 			const rotatingImage =  get(["current"], imageRef);
// 			if (!imageCanvasNode || !rotatingImage) {
// 				return;
// 			}
// 			const canvasContext = imageCanvasNode.getContext("2d");
// 			if (!canvasContext) {
// 				return;
// 			}
// 			// get whichever element actually exists
// 			// rotate the canvas, draw the image, and rotate the canvas back
// 			canvasContext.save();
// 			canvasContext.translate(
// 				imageCanvasNode.width / 2,
// 				imageCanvasNode.height / 2,
// 			);
// 			canvasContext.rotate(Math.PI / 2);
// 			canvasContext.translate(
// 				(-1 * imageCanvasNode.height / 2),
// 				(-1 * imageCanvasNode.width / 2),
// 			);
// 			canvasContext.drawImage(
// 				rotatingImage,
// 				0,
// 				0,
// 				state.imageHeight || 0,
// 				state.imageWidth || 0,
// 			);
// 			canvasContext.restore();
// 			imageCanvasNode.toBlob((imageBlob: Blob | null) => {
// 				if (!imageBlob) {
// 					return;
// 				}
// 				dispatch({
// 					imageBlob,
// 					type: EImageActionType.LoadImage,
// 				});
// 			}, "image/jpeg", 1.0);
// 		}
// 	};

const createImageBlobIfNotExists =
(image: string, state: Partial<IImageState>, dispatch: React.Dispatch<IImageAction>) =>
	() => {
		console.log("creating image blob")
		if (!state.image?.size) {
			if (!!image) {
				fetch(image)
					.then((res) => res.blob())
					.then((imageBlob) => dispatch({
						image: imageBlob,
						imageUploaded: false,
						type: EImageActionType.LoadImage,
					}));
			}
		}
	};

const resizeWindow = (dispatch: React.Dispatch<IImageAction>) => {
	const updateWindowDimensions = throttle(250, () => {
		console.log("updating window dimensions")
		dispatch({
		type: EImageActionType.ResizeWindow,
		windowHeight: window.innerHeight,
		windowWidth: window.innerWidth,
	})});
	return () => {
		updateWindowDimensions();
		window.addEventListener("resize", updateWindowDimensions);
		return () => {
			window.removeEventListener("resize", updateWindowDimensions);
		};
	};
};
