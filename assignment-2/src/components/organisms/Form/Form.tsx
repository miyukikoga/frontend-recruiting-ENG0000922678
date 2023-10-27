import React, { useState } from "react";
import { LabelInput } from "../../molecules/LabelInput";
import { LabelSelect } from "../../molecules/LabelSelect";
import { Button } from "../../atoms/Button";
import { prefectures } from "../../../constants/prefectures";
import { url, formInfo, validationMessages } from "../../../constants/form";
import "./form.scss";

export const Form = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [prefecture, setPrefecture] = useState<string>("");
  const [address1, setAddress1] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");

  const [emailValidationError, setEmailValidationError] = useState("");
  const [zipValidationError, setZipValidationState] = useState("");

  /**
   * ボタンが無効かを判定する
   * @returns ボタンが無効かどうか
   */
  const isButtonDisabled = (): boolean => {
    if (name && email && zip && prefecture && address1) return false;
    return true;
  };

  /**
   * メールアドレスのバリデーションを行う
   * @param value メールアドレス
   */
  const emailValidation = (value: string): void => {
    if (!value.match(/^[a-z\d][\w.-]*@[\w.-]+\.[a-z\d]+$/i)) {
      setEmailValidationError(validationMessages.email);
      return;
    }
    setEmailValidationError("");
  };

  /**
   * 郵便番号のバリデーションを行う
   * @param value 郵便番号
   */
  const zipValidation = (value: string): void => {
    if (!value.match(/^\d{7}$/)) {
      setZipValidationState(validationMessages.zip);
      return;
    }
    setZipValidationState("");
  };

  /**
   * バリデーションエラーがあったか判定する
   * @returns バリデーションエラーがあったかどうか
   */
  const isValidationError = (): boolean => {
    if (emailValidationError || zipValidationError) return true;
    return false;
  };

  const onSubmitHandler: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    emailValidation(email);
    zipValidation(zip);
    if (isValidationError()) return;

    const requestBody = {
      name,
      email,
      zip,
      prefecture,
      address1,
      address2,
    };
    console.log(requestBody);

    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    };
    fetch(url, request)
      .then((response) => console.log(response))
      .catch((e) => {
        console.error("fetch error");
        console.error(e);
      });
  };

  return (
    <form className="Form" onSubmit={onSubmitHandler}>
      <div>
        <LabelInput
          label={formInfo.name.label}
          placeholder={formInfo.name.placeholder}
          errorMessage=""
          setValue={setName}
        />
      </div>
      <div>
        <LabelInput
          label={formInfo.email.label}
          placeholder={formInfo.email.placeholder}
          errorMessage={emailValidationError}
          setValue={setEmail}
        />
      </div>
      <div>
        <LabelInput
          label={formInfo.zip.label}
          placeholder={formInfo.zip.placeholder}
          errorMessage={zipValidationError}
          setValue={setZip}
        />
      </div>
      <div>
        <LabelSelect
          label={formInfo.prefecture.label}
          placeholder={formInfo.prefecture.placeholder}
          items={prefectures}
          setValue={setPrefecture}
        />
      </div>
      <div>
        <LabelInput
          label={formInfo.address1.label}
          placeholder={formInfo.address1.placeholder}
          errorMessage=""
          setValue={setAddress1}
        />
      </div>
      <div>
        <LabelInput
          label={formInfo.address2.label}
          placeholder={formInfo.address2.placeholder}
          errorMessage=""
          setValue={setAddress2}
        />
      </div>
      <div>
        <Button label={formInfo.button.label} disabled={isButtonDisabled()} />
      </div>
    </form>
  );
};
