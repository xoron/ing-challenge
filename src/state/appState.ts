import { LitState, stateVar } from "lit-element-state";

class AppState extends LitState {
  @stateVar() heading = "global state management works!";
}

export const appState = new AppState();
