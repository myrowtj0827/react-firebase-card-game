declare module "MyTypes" {
    import { StateType, ActionType } from "typesafe-actions"
    import { RouterAction, RouterActionType } from "connected-react-router"
    export type RootState = StateType<typeof import("./rootReducer").default>
    type ReactRouterAction = RouterActionType
    export type RootAction = ReactRouterAction | TodosAction
}
