import { IEvent } from "../../../models/IEvent";
import { EventAction, EventActionEnum, EventState } from "./types";

const initialState: EventState = {
  guests: [],
  events: [],
  error: "",
  isLoading: false,
};

export default function EventReducer(
  state = initialState,
  action: EventAction
): EventState {
  switch (action.type) {
    case EventActionEnum.SET_EVENTS:
      return { ...state, events: action.payload };
    case EventActionEnum.SET_GUESTS:
      return { ...state, guests: action.payload };
      case EventActionEnum.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
      case EventActionEnum.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
