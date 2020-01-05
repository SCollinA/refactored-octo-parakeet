export interface ILayoutState {
	isLoggedIn: boolean;
}

export interface ILayoutAction extends Partial<ILayoutState> {
	type: ELayoutActionTypes;
}

export enum ELayoutActionTypes {
	Login,
}
