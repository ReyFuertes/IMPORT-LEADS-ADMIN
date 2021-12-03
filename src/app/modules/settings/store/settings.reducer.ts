import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on, Action } from "@ngrx/store";
import { ISettings } from "src/app/models/generic.model";

export interface SettingsState extends EntityState<ISettings> {
}
export const adapter: EntityAdapter<ISettings> = createEntityAdapter<ISettings>({});
export const initialState: SettingsState = adapter.getInitialState({

});
const settingsReducer = createReducer(
  initialState,
);
export function SettingsReducer(state: SettingsState, action: Action) {
  return settingsReducer(state, action);
}