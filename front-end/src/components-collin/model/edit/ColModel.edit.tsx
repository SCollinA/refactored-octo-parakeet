import { map } from "lodash/fp";
import React, { ReactNode, SyntheticEvent } from "react";

import ColButton from "../../buttons/ColButton";
import ColCard from "../../layout/card/ColCard";
import { IColDataModel } from "../../viewModelStore/ColDataModel";
import { DataViews } from "../../viewModelStore/ColViewModelValue";

import ColBooleanInput from "../data/boolean/edit/ColBoolean.edit";
import ColImageInput from "../data/image/edit/ColImage.edit";
import ColNumberInput from "../data/number/edit/ColNumber.edit";
import ColStringLongInput from "../data/string-long/edit/ColStringLong.edit";
import ColStringInput from "../data/string/edit/ColString.edit";

import "./ColModel.edit.scss";

export default ({
	cancel = () => undefined,
	remove = () => undefined,
	reset = () => undefined,
	submit = () => undefined,
	update = () => undefined,
	dataViews: dataViews,
}: {
	cancel?: () => void,
	remove?: () => void,
	reset?: () => void,
	submit?: () => void,
	update?: (value: Partial<IColDataModel>) => void,
	dataViews: DataViews,
}) => {
	return (
		<form id="col-model-edit" className="col-model-edit"
			onReset={() => reset()}
			onSubmit={(event: SyntheticEvent) => {
				event.preventDefault();
				submit();
			}}
		>
			{map(
				(dataView) => {
					const dataViewLayout = (input: ReactNode) => (
						<ColCard key={dataView.key} clickable={true}>
							<label htmlFor={dataView.key} className={`col-model-edit__label-${dataView.key}`}>
								{dataView.key}
								{input}
							</label>
						</ColCard>
					);
					switch (dataView.type) {
						case "STRING":
							return dataViewLayout(
								<ColStringInput id={dataView.key}
									autoFocus={true}
									onChange={(value: string) => {
										update({ [dataView.key]: value });
									}}
									value={dataView.value || dataView.placeholder}
									placeholder={dataView.placeholder}
								/>,
							);
						case "STRING_LONG":
							return dataViewLayout(
								<ColStringLongInput id={dataView.key}
									autoFocus={true}
									onChange={(value: string) => update({ [dataView.key]: value })}
									value={dataView.value || dataView.placeholder}
									placeholder={dataView.key}
								/>,
							);
						case "BOOLEAN":
							return dataViewLayout(
								<ColBooleanInput id={dataView.key}
									affirmativeText={dataView.key}
									onChange={(value: boolean) => update({ [dataView.key]: value })}
									checked={dataView.value || dataView.placeholder}
								/>,
							);
						case "INTEGER":
							return dataViewLayout(
								<ColNumberInput id={dataView.key}
									autoFocus={true}
									onChange={(value: number) => update({ [dataView.key]: value })}
									value={dataView.value || dataView.placeholder}
									placeholder={dataView.key}
								/>,
							);
						case "FLOAT":
							return dataViewLayout(
								<ColNumberInput id={dataView.key}
									autoFocus={true}
									onChange={(value: number) => update({ [dataView.key]: value })}
									value={dataView.value || dataView.placeholder}
									placeholder={dataView.key}
								/>,
							);
						case "IMAGE":
							// console.log("returning data view mapped to image input", dataView)
							return dataViewLayout(
								<ColImageInput image={dataView.value}
									onChange={(value: string) => update({ [dataView.key]: value })}
								/>,
							);
					}
				},
				dataViews,
			)}
			<div className="col-model-edit__buttons">
				<ColButton type="button"
					value="cancel"
					action={() => cancel()}
				/>
				<ColButton type="button"
					value="delete"
					action={() => remove()}
				/>
				<ColButton type="reset"
					value="reset"
				/>
				<ColButton type="submit"
					value="submit"
				/>
			</div>
		</form>
	);
};
