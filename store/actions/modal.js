import { modalActions } from '../constants/modal';

export const toggleModal = payload => ({ type: modalActions.TOGGLE, payload });