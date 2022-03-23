import { Action } from "redux";

const INCREMENT = "INCREMENT";

const DECREMENT = "DECREMENT";

const CHANGE_BY_AMOUNT = "CHANGE_BY_AMOUNT";

export const incrementAction = () => ({
    type: INCREMENT,
});

export const decrementAction = () => ({
    type: DECREMENT,
});

export const changeByAmount = (val: number) => ({
    type: CHANGE_BY_AMOUNT,
    payload: val,
});

export interface DeviceReducerState {
    counter: { amount: number },
}

const initialState: DeviceReducerState = {
    counter: { amount: 0 },
};

interface IAction<T> extends Action<string> {
    type: string;
    payload?: T;
    error?: boolean;
}

export default (state = initialState, action: IAction<number>) => {
    switch (action.type) {
    case INCREMENT:
        return { 
            ...state, counter: { amount: state.counter.amount + 1 }
        };
    case DECREMENT:
        return { 
            ...state, counter: { amount: state.counter.amount - 1 }
        };
    case CHANGE_BY_AMOUNT:
        return { 
            ...state, 
            counter: { amount: state.counter.amount + (action.payload ?? 0) } 
        };
    default:
        return state;
    }
};