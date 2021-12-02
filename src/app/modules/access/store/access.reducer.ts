import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on, Action } from "@ngrx/store";
import { IAccess } from "src/app/models/generic.model";

export interface AccessState extends EntityState<IAccess> {

}
export const adapter: EntityAdapter<IAccess> = createEntityAdapter<IAccess>({});
export const initialState: AccessState = adapter.getInitialState({

});
const accessReducer = createReducer(
  initialState,

  
);
export function AccessReducer(state: AccessState, action: Action) {
  return accessReducer(state, action);
}