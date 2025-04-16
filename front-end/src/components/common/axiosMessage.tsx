//this component is to show axios results such as errors , responses
import { AxiosError, AxiosResponse } from "axios";
import { AxiosMessageProps } from "../../types/objects/axiosMessageProps";
import { ServerResponse } from "../../types/objects/serverResponse";

const AxiosMessage = (props: AxiosMessageProps) => {
  function isAxiosError(value: unknown): value is AxiosError {
    //checks that axios message is error
    return (value as AxiosError).isAxiosError !== undefined;
  }

  function isAxiosResponse(value: unknown): value is AxiosResponse {
    //checks that axios message is response from server
    return (
      !!value &&
      typeof value === "object" &&
      "status" in value &&
      !("isAxiosError" in value)
    );
  }
  return (
    <div>
      {isAxiosResponse(props.msg) ? (
        <h1 className="bg-green-300">{props.msg.data.message}</h1>
      ) : null}
      {isAxiosError(props.msg) ? (
        props.msg.response ? (
          <div className="bg-red-300">
            <h1>{(props.msg.response.data as ServerResponse).message}</h1>
            {(props.msg.response.data as ServerResponse).data?.errors?.map(
              (err: any, index: number) => {
                return <h1 key={index}>{err}</h1>;
              }
            )}
          </div>
        ) : (
          <h1 className="bg-red-300">خطا در اتصال به سرور</h1>
        )
      ) : null}
    </div>
  );
};
export default AxiosMessage;
