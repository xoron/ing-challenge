import { LitState, stateVar } from 'lit-element-state';

class AppState extends LitState {
    @stateVar() heading = 'aaaa';
    @stateVar() counter = 0;
    @stateVar() asdasd = 'dsadsa';
}

export const appState = new AppState();