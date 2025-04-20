//this component is to show axios results such as errors , responses
import { AxiosError, AxiosResponse } from "axios";
import { AxiosMessageProps } from "../../types/objects/axiosMessageProps";
import { ServerResponse } from "../../types/objects/serverResponse";
import { useEffect, useState } from "react";

const AxiosMessage = (props: AxiosMessageProps) => {
  const [show, setShow] = useState<any>(null);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [props.msg]);

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

  function handleSuccessMsg(msg: any) {
    return <h1 className="bg-green-300">{msg.data.message}</h1>;
  }

  function handleErrorMsg(msg: any) {
    return msg.response ? (
      <div className="bg-red-300">
        <h1>{(msg.response.data as ServerResponse).message}</h1>
        {(msg.response.data as ServerResponse).data?.errors?.map(
          (err: any, index: number) => {
            return <h1 key={index}>{err}</h1>;
          }
        )}
      </div>
    ) : (
      <h1 className="bg-red-300">خطا در اتصال به سرور</h1>
    );
  }

  if (!show) return null;
  return (
    <div>
      {isAxiosResponse(props.msg) ? handleSuccessMsg(props.msg) : null}
      {isAxiosError(props.msg) ? handleErrorMsg(props.msg) : null}
    </div>
  );
};
export default AxiosMessage;
