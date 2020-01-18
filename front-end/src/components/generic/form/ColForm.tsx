import { map } from "lodash/fp";
import React, { ReactNode, SyntheticEvent, useState } from "react";

import ColButton from "../buttons/ColButton";
import ColCard from "../layout/card/ColCard";
import { IColDataModel } from "../viewModelStore/ColDataModel";
import ColViewModel from "../viewModelStore/ColViewModel";

import ColBooleanInput from "./inputs/boolean/ColBoolean.input";
import ColImageInput from "./inputs/image/ColImage.input";
import ColNumberInput from "./inputs/number/ColNumber.input";
import ColTextInput from "./inputs/string/ColText.input";
import ColTextAreaInput from "./inputs/string/ColTextArea.input";

import "./ColForm.css";
import "./ColInput.css";

export default ({
	cancel,
	remove,
	reset,
	submit,
	viewModel,
}: {
	cancel?: () => void,
	remove?: () => void,
	reset?: () => void,
	submit?: () => void,
	viewModel: ColViewModel<IColDataModel>,
}) => {
	const [dataViews, setDataViews] = useState(viewModel.dataViews);
	return (
		<form id="col-form" className="col-form"
			onReset={() => viewModel.reset(reset)}
			onSubmit={(event: SyntheticEvent) => {
				event.preventDefault();
				return viewModel.submit(submit);
			}}
		>
			{map(
				(dataView) => {
					const dataViewLayout = (input: ReactNode) => (
						<ColCard key={dataView.key} clickable={true}>
							<label htmlFor={dataView.key} className={`col-form__label-${dataView.key}`}>
								{dataView.key}
								{input}
							</label>
						</ColCard>
					);
					switch (dataView.type) {
						case "STRING":
							return dataViewLayout(
								<ColTextInput id={dataView.key}
									autoFocus={true}
									onChange={(value: string) => viewModel.update({
										[dataView.key]: value,
									}, ({dataViews: newDataViews}) =>
										setDataViews(newDataViews),
									)}
									value={dataView.value || dataView.placeholder}
									placeholder={dataView.placeholder}
								/>,
							);
						case "STRING_LONG":
							return dataViewLayout(
								<ColTextAreaInput id={dataView.key}
									onChange={(value: string) => viewModel.update({
										[dataView.key]: value,
									}, ({dataViews: newDataViews}) =>
										setDataViews(newDataViews),
									)}
									value={dataView.value || dataView.placeholder}
									placeholder={dataView.key}
								/>,
							);
						case "BOOLEAN":
							return dataViewLayout(
								<ColBooleanInput id={dataView.key}
									affirmativeText={dataView.key}
									onChange={(value: boolean) => viewModel.update({
										[dataView.key]: value,
									}, ({dataViews: newDataViews}) =>
										setDataViews(newDataViews),
									)}
									checked={dataView.value || dataView.placeholder}
								/>,
							);
						case "INTEGER":
							return dataViewLayout(
								<ColNumberInput id={dataView.key}
									autoFocus={true}
									onChange={(value: number) => viewModel.update({
										[dataView.key]: value,
									}, ({dataViews: newDataViews}) =>
										setDataViews(newDataViews),
									)}
									value={dataView.value || dataView.placeholder}
									placeholder={dataView.key}
								/>,
							);
						case "FLOAT":
							return dataViewLayout(
								<ColNumberInput id={dataView.key}
									autoFocus={true}
									onChange={(value: number) => viewModel.update({
										[dataView.key]: value,
									}, ({dataViews: newDataViews}) =>
										setDataViews(newDataViews),
									)}
									value={dataView.value || dataView.placeholder}
									placeholder={dataView.key}
								/>,
							);
						case "IMAGE":
							return dataViewLayout(
								<ColImageInput image={dataView.value}/>,
							);
					}
				},
				dataViews,
			)}
			<ColButton type="button"
				value="cancel"
				action={() => viewModel.reset(cancel)}
			/>
			<ColButton type="button"
				value="delete"
				action={() => viewModel.remove(remove)}
			/>
			<ColButton type="reset"
				value="reset"
			/>
			<ColButton type="submit"
				value="submit"
			/>
		</form>
	);
};