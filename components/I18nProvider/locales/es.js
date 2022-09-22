import { z } from "zod";

export const es = {
  sign_in: "Iniciar sesión",
  sign_up: "Registrarse",
  email: "Correo",
  password: "Contraseña",
  confirm_password: "Confirmar contraseña",
  name: "Nombre",
  sign_in_title: "Inicia sesión",
  sign_up_title: "Crea una cuenta",
  create_new_account: "Crear nueva cuenta",
  already_have_an_account: "Ya tengo una cuenta",
  invalid_credentials: "Credenciales inválidas",
  unknown_error: "Error desconocido",
  email_already_in_use: "Correo en uso",
  signin_in: "Iniciando sesión",
  signin_up: "Registrando",
  registered_account: "Cuenta creada",
  welcome: "Bienvenido",
  verify_your_email: "Verifica tu correo antes de entrar",
  sign_out: "Cerrar sesión",
  seller: "Vendedor",
  buyer: "Comprador",
  role: "Rol",
  home: "Inicio",
  chat: "Chat",
  write_your_message: "Escribe tu mensaje",
  no_messages_found: "No se encontraron mensajes",
  no_pending_chats: "No tienes chats pendientes por aceptar",
  wants_to_talk_with_you: "quiere iniciar un chat contigo",
  chats_pending_to_accept: "Chats a aceptar",
  accept: "Aceptar",
  empty_chats_list: "No tienes chats",
};
/** @type { z.ZodErrorMap  } */
export const zodCustomErrorMapEs = (issue, ctx) => {
  if (issue.path[0] === "confirmationPassword") {
    return { message: "Las contraseñas no coinciden" };
  }
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === "string") {
      return { message: "Tipo de dato incorrecto" };
    }
  }
  if (issue.code === z.ZodIssueCode.too_small) {
    return {
      message: `El campo debe contener al menos ${issue.minimum} caractéres`,
    };
  }
  if (issue.code === z.ZodIssueCode.too_big) {
    return {
      message: `El campo debe contener como máximo ${issue.maximum} caractéres`,
    };
  }
  if (issue.code === z.ZodIssueCode.invalid_string) {
    if (issue.validation === "email")
      return {
        message: "Correo inválido",
      };
  }
  if (issue.code === z.ZodIssueCode.custom) {
    return { message: `less-than-${(issue.params || {}).minimum}` };
  }
  return { message: ctx.defaultError };
};
