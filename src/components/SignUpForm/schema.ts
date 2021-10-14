import * as yup from "yup";

export const signUpFormSchema = yup.object().shape({
  first_name: yup.string().required("Primeiro nome obrigatório"),
  last_name: yup.string().required("Sobrenome obrigatório"),
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  cpf: yup.string().required("CPF obrigatório"),
  password: yup.string().required("Senha obrigatória"),
  confirm_password: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
  address: yup.string().required("Endereço obrigatório"),
  city: yup.string().required("Cidade obrigatória"),
  state: yup.string().required("Estado obrigatória"),
  available: yup.boolean(),
});
