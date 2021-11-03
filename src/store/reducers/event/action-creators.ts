import { AppDispatch } from "../..";
import UserService from "../../../api";
import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUser";
import { EventActionEnum, SetErrorAction, SetEventsAction, SetGuestsAction, SetIsLoadingAction } from "./types";



export const EventActionCreators = {
setGustes: (payload: IUser[]): SetGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload}),
setEvents: (payload: IEvent[]): SetEventsAction => ({type: EventActionEnum.SET_EVENTS, payload}),
setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: EventActionEnum.SET_IS_LOADING, payload}),
setError: (payload: string): SetErrorAction => ({type: EventActionEnum.SET_ERROR, payload}),
fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
        const response = await UserService.getUsers();
        dispatch(EventActionCreators.setGustes(response?.data))

    } catch (e) {
        console.log(e)
    }
},
createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
        dispatch(EventActionCreators.setIsLoading(true));

        const events = localStorage.getItem("events") || '[]';
        const json = JSON.parse(events) as IEvent[];

        json.push(event);
        dispatch(EventActionCreators.setEvents(json))
        localStorage.setItem('events', JSON.stringify(json))

    } catch (e) {
        console.log(e)
        dispatch(EventActionCreators.setError('Ошибка при создании события!'))
    } finally {
        dispatch(EventActionCreators.setIsLoading(false))
    }
},
fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(EventActionCreators.setIsLoading(true))
        const events = localStorage.getItem("events") || '[]';
        const json = JSON.parse(events) as IEvent[];
        const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username)
        console.log(currentUserEvents, 'currentUserEvents')
        dispatch(EventActionCreators.setEvents(currentUserEvents));
    } catch (e) {
        console.log(e)
        dispatch(EventActionCreators.setError('Ошибка при получении события'))
    } finally {
        dispatch(EventActionCreators.setIsLoading(false))
    }
}

}
