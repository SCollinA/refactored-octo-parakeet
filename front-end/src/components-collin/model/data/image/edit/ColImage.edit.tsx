import {
	get,
	throttle,
} from "lodash/fp";
import React, {
	RefObject,
	useEffect,
	useReducer,
} from "react";

import ColButton from "../../../../buttons/ColButton";
import { blobUrl } from "../../../../utils/blobs.utils";

import "../../ColData.edit.scss";

import "./ColImage.edit.scss";

enum EImageActionType {
	LoadImage = "LOAD_IMAGE",
	UpdateImage = "UPDATE_IMAGE",
	RemoveImage = "REMOVE_IMAGE",
	SetImageDimensions = "SET_IMAGE_DIMENSIONS",
	ResizeWindow = "RESIZE_WINDOW",
	RotateImage = "ROTATE_IMAGE",
	SetImageWidthPercent = "SET_IMAGE_WIDTH_PERCENT",
}
interface IImageState {
	image: Blob | File | undefined;
	imageHeight: number;
	rotatingImage: boolean;
	updatingImage: boolean;
	imageWidth: number;
	imageWidthPercent: number;
	removingImage: boolean;
	windowHeight: number;
	windowWidth: number;
}
interface IImageAction extends Partial<IImageState> {
	type: EImageActionType;
}

const imageState: IImageState = {
	image: undefined,
	imageHeight: 0,
	rotatingImage: false,
	updatingImage: false,
	imageWidth: 0,
	imageWidthPercent: 1,
	removingImage: false,
	windowHeight: 0,
	windowWidth: 0,
};

const imageReducer: React.Reducer<Partial<IImageState>, IImageAction> =
	(state: Partial<IImageState>, action: IImageAction) => {
		switch (action.type) {
			case EImageActionType.LoadImage:
			// Reset image width when blob changes (initial load or image rotation)
			// Set image not visible in order to get natural dimensions after image changes
				// console.log("load image changed", action)
				return {
					...state,
					image: action.image,
					updatingImage: action.updatingImage,
					imageWidthPercent: 0,
					imageHeight: 0,
					imageWidth: 0,
					rotatingImage: false,
				};
			case EImageActionType.SetImageDimensions:
				// console.log("resize image changed", action)
				return {
					...state,
					imageHeight: action.imageHeight,
					imageWidth: action.imageWidth,
				};
			case EImageActionType.SetImageWidthPercent:
				// console.log("image width percent changed", action)
				return {
					...state,
					rotatingImage: false,
					imageWidthPercent: action.imageWidthPercent,
				};
			case EImageActionType.UpdateImage:
				// console.log("emitting image action");
				return {
					...state,
					updatingImage: false,
					removingImage: false,
				}
			case EImageActionType.ResizeWindow:
				// console.log("resize window changed", action)
				return {
					...state,
					windowHeight: action.windowHeight,
					windowWidth: action.windowWidth,
				};
			case EImageActionType.RemoveImage:
				// console.log("remove image changed", action)
				return {
					...state,
					updatingImage: true,
					image: undefined,
					imageWidth: 0,
					imageHeight: 0,
					imageWidthPercent: 1,
					removingImage: true,
				};
			case EImageActionType.RotateImage:
				// console.log("rotate image changed", action)
				return {
					...state,
					rotatingImage: true,
					imageWidth: state.imageHeight,
					imageHeight: state.imageWidth,
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
	let imageInput: HTMLInputElement;
	const imageRef =  React.createRef<HTMLImageElement>();
	const canvasRef =  React.createRef<HTMLCanvasElement>();
	const [state, dispatch] = useReducer(imageReducer, imageState);
	// Initialize window dimensions observers
	useEffect(attachWindowResizeEventListeners(dispatch), []);
	// console.log("rendering col image edit", state);
	// Step 1: Create image blob from existing image value
	useEffect(createImageBlobIfNotExists(image, state, dispatch), [image]);
	// Get scaled image width
	useEffect(getImageWidthPercent(state, dispatch), [
		state.windowWidth,
		state.windowHeight,
		state.imageHeight,
		state.imageWidth,
	]);
	// Update image when changed
	useEffect(updateImage(
		state,
		dispatch,
		imageRef,
		canvasRef,
		onChange,
	), [state.updatingImage, state.imageWidthPercent]);
	useEffect(removeImage(
		state,
		dispatch,
		onChange,
	), [state.removingImage]);
	useEffect(rotateImage(
		state,
		dispatch,
		imageRef,
		canvasRef,
	), [state.rotatingImage]);
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
						// console.log("file input new value")
						dispatch({
						image: event.target.files[0],
						updatingImage: true,
						type: EImageActionType.LoadImage,
					})}}
				/>
				<ColButton type="button" value="rotate right"
					action={() => dispatch({ type: EImageActionType.RotateImage})}
				/>
				<ColButton type="button" value="remove image"
					action={() => dispatch({ type: EImageActionType.RemoveImage })}
				/>
			</div>
			{!!state.image && (<>
				{/* Loaidng image offscreen to get natural dimensions */}
				<img className="col-image-edit__hidden-image" ref={imageRef}
					style={{
						display: "none",
						width: "unset",
					}}
					alt="natural image"
					// Step 2: Resize image on load using natural dimensions
					onLoad={() => {
						// console.log("hidden img element loaded")
						dispatch({
						imageHeight: get(["current", "height"], imageRef),
						imageWidth: get(["current", "width"], imageRef),
						type: EImageActionType.SetImageDimensions,
					})}}
					src={blobUrl(state.image)}
				/>
				<canvas className="col-image-edit__canvas" ref={canvasRef}
					width={state.imageWidth}
					height={state.imageHeight}
					style={{ display: "none" }}
				/>
				{/* Load image on screen after scaling */}
				{!!state.imageWidthPercent &&
					<img className="col-image-edit__uploaded-image"
						style={{
							display: "block",
							width: `${state.imageWidthPercent * 100}%`,
						}}
						alt="uploaded image"
						src={blobUrl(state.image)}
					/>}
			</>)}
		</div>
	);
};

const removeImage = (
	state: Partial<IImageState>,
	dispatch: React.Dispatch<IImageAction>,
	onChange: (value: string) => void,
) => () =>  {
	if (state.removingImage) {
		// console.log("removing image")
		onChange("")
		dispatch({ type: EImageActionType.UpdateImage })
	}
};

const updateImage = (
	state: Partial<IImageState>,
	dispatch: React.Dispatch<IImageAction>,
	imageRef: RefObject<HTMLImageElement>,
	canvasRef: RefObject<HTMLCanvasElement>,
	onChange: (value: string) => void,
) => () => {
		const {
			updatingImage: imageUploaded,
			imageWidthPercent,
			imageWidth,
			imageHeight,
		} = state;
		// console.log("updating image maybe")
		if (
			imageUploaded && !!imageWidthPercent &&
			!!imageWidth && !!imageHeight &&
			!!canvasRef?.current && !!imageRef?.current
		) {
			// console.log("updating image")
			const imageNode = imageRef.current;
			const canvasNode = canvasRef.current;
			const canvasContext = canvasNode.getContext("2d");
			if (!canvasContext) {
				return;
			}
			// console.log("updating image 2")
			canvasContext.drawImage(
				imageNode,
				0,
				0,
				imageWidth,
				imageHeight,
			);
			canvasNode.toBlob((imageBlob) => {
				if (!imageBlob) {
					return;
				}
				const fr = new FileReader();
				fr.onload = () => {
					const uploadedImage = btoa(`${fr.result}`);
					if (!!uploadedImage) {
						// console.log("updating image 3")
						onChange(`data:image/jpeg;base64,${uploadedImage}`);
						dispatch({ type: EImageActionType.UpdateImage })
					}
				};
				fr.readAsBinaryString(imageBlob);
			}, "image/jpeg");
		}
	};

const rotateImage = (
	state: Partial<IImageState>,
	dispatch: React.Dispatch<IImageAction>,
	imageRef: RefObject<HTMLImageElement>,
	canvasRef: RefObject<HTMLCanvasElement>,
) =>
	() => {
		if (state.rotatingImage && !!canvasRef?.current && !!imageRef?.current) {
			// get canvas and image elements from page
			const canvasNode = get(["current"], canvasRef);
			const imageNode =  get(["current"], imageRef);
			if (!canvasNode || !imageNode) {
				return;
			}
			const canvasContext = canvasNode.getContext("2d");
			if (!canvasContext) {
				return;
			}
			// update the canvas size and position
			canvasContext.save();
			// move to the right half the width of canvas
			canvasContext.translate(
				canvasNode.width / 2,
				canvasNode.height / 2,
			);
			// rotate right 90 degrees
			canvasContext.rotate(Math.PI / 2);
			// move to the left half the height of canvas
			canvasContext.translate(
				(-1 * canvasNode.height / 2),
				(-1 * canvasNode.width / 2),
			);
			// draw the hidden image to the canvas
			canvasContext.drawImage(
				imageNode,
				0,
				0,
				state.imageHeight || 0,
				state.imageWidth || 0,
			);
			canvasContext.restore();
			canvasNode.toBlob((image: Blob | null) => {
				if (!image) {
					return;
				}
				dispatch({
					image,
					updatingImage: true,
					type: EImageActionType.LoadImage,
				});
			}, "image/jpeg", 1.0);
		}
	};

const getImageWidthPercent = (
	state: Partial<IImageState>,
	dispatch: React.Dispatch<IImageAction>,
) => () => {
	const {
		imageWidth,
		imageHeight,
		windowWidth,
		windowHeight,
	} = state;
	// console.log("getting image width percent maybe")
	if (!!imageWidth && !!imageHeight &&
		!!windowWidth && !!windowHeight) {
		// console.log("getting image width percent")
		const aspectRatio = imageWidth / imageHeight;
		let newWidth = imageWidth;
		let newHeight = imageHeight;
		if (newWidth >= (windowWidth * .9)) {
			newWidth = windowWidth * .9;
			newHeight = newWidth / aspectRatio;
		}
		if (newHeight >= (windowHeight * .9)) {
			newHeight = windowHeight * .9;
			newWidth = newHeight * aspectRatio;
		}
		let newImageWidthPercent = newWidth / imageWidth;
		if (newImageWidthPercent > 1) {
			newImageWidthPercent = 1;
		}
		dispatch({
			imageWidthPercent: newImageWidthPercent,
			type: EImageActionType.SetImageWidthPercent,
		});
	}
};

const createImageBlobIfNotExists = (
	image: string,
	state: Partial<IImageState>,
	dispatch: React.Dispatch<IImageAction>,
) => () => {
		// console.log("creating image blob")
		if (!state.image?.size) {
			if (!!image) {
				fetch(image)
					.then((res) => res.blob())
					.then((imageBlob) => dispatch({
						image: imageBlob,
						updatingImage: false,
						type: EImageActionType.LoadImage,
					}));
			}
		}
	};

const attachWindowResizeEventListeners = (dispatch: React.Dispatch<IImageAction>) => {
	const updateWindowDimensions = throttle(250, () => {
		// console.log("updating window dimensions")
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
