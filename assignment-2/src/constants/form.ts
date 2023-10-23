export const url = "https://httpstat.us/201";
export const formInfo = {
  name: { label: "氏名", placeholder: "(例)トレタ太郎" },
  email: { label: "Eメール", placeholder: "(例)yoyaku@toreta.in" },
  zip: { label: "郵便番号", placeholder: "(例)0000000" },
  prefecture: { label: "都道府県", placeholder: "選択してください" },
  address1: {
    label: "市区町村・番地",
    placeholder: "(例)品川区西五反田７丁目２２−１７",
  },
  address2: { label: "建物名・号室", placeholder: "(例)TOCビル 8F" },
  button: { label: "登録", placeholder: "" },
};
export const validationMessages = {
  email: "正しいメールアドレスを入力してください",
  zip: "ハイフンを含めず半角英数字で入力してください",
};
