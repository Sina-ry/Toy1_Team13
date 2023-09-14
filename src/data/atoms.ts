import { atom } from 'recoil';

export interface commuteType {
  date: string;
  commute: boolean;
  startTime: number;
  endTime: number;
  workingTime: number;
}

export const commuteState = atom<commuteType>({
  key: 'commuteState',
  default: {
    date: '',
    commute: false,
    startTime: 0,
    endTime: 0,
    workingTime: 0,
  },
});