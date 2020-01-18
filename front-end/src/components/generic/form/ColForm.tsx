import { map } from "lodash/fp";
import React, { ReactNode, SyntheticEvent, useState } from "react";

import ColButton from "../buttons/ColButton";
import ColCard from "../layout/card/ColCard";
import { IColDataModel } from "../viewModelStore/ColDataModel";
import ColViewModel from "../viewModelStore/ColViewModel";

import ColTextInput from "./inputs/ColText.input";
import ColTextAreaInput from "./inputs/ColTextArea.input";

import "./ColForm.css";
import ColBooleanInput from "./inputs/ColBoolean.input";

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
		<form id="col-form"
			onReset={() => viewModel.reset(reset)}
			onSubmit={(event: SyntheticEvent) => {
				event.preventDefault();
				return viewModel.submit(submit);
			}}
		>
			{map(
				(dataView) => {
					const dataViewLayout = (input: ReactNode) => (
						<ColCard key={dataView.key}  clickable={true}>
							<label htmlFor={dataView.key}>
								{dataView.key}
							</label>
							{input}
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
									placeholder={dataView.key}
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
								<ColBooleanInput affirmativeText={dataView.key}
									onChange={(value: boolean) => viewModel.update({
										[dataView.key]: value,
									}, ({dataViews: newDataViews}) =>
										setDataViews(newDataViews),
									)}
									checked={dataView.value || dataView.placeholder}
								/>,
							);
						default:
							return null;
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
