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
  you_are_selling: "Estás vendiendo",
  store_product: "Guardar producto",
  title: "Título",
  description: "Descripción",
  price: "Precio",
  add_a_new_product: "Agrega un nuevo producto",
  please_select_an_image: "Por favor selecciona una imagen",
  no_products_found: "No se encontraron productos",
  category: "Categoría",
  last_week_most_sold_items: "Productos más vendidos de la última semana",
  sales_per_month: "Sales per month",
  sales_per_day: "Ventas por día",
  statistics: "Estadísticas",
  products_let: "Quedan",
  sold_by: "Vendido por",
  mark_1_sold: "Marcar una venta",
  pickup_point: "Punto de venta",
  serial_number: "Número de serie",
  stock: "Cantidad",
  is_new: "Es nuevo",
  new: "Nuevo",
  not_new: "Usado",
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
