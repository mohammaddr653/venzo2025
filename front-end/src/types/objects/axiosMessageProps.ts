import { AxiosError, AxiosResponse } from "axios";

export type AxiosMessageType = AxiosError | AxiosResponse | null;
export interface AxiosMessageProps {
  msg: AxiosMessageType;
}
