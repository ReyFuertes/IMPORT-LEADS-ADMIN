import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on, Action } from "@ngrx/store";
import { IRole } from "src/app/models/generic.model";

export interface RoleState extends EntityState<IRole> {

}
export const adapter: EntityAdapter<IRole> = createEntityAdapter<IRole>({});
export const initialState: RoleState = adapter.getInitialState({

});
const roleReducer = createReducer(
  initialState,

  
);
export function RoleReducer(state: RoleState, action: Action) {
  return roleReducer(state, action);
}