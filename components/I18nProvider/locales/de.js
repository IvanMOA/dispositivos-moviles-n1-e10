import { z } from "zod";

export const de = {
  sign_in: "Einloggen",
  sign_up: "Eintragung",
  email: "Post",
  password: "Passwort",
  confirm_password: "Passwort bestätigen",
  name: "Name",
  sign_in_title: "Einloggen",
  sign_up_title: "Ein Konto erstellen",
  create_new_account: "Ein Konto erstellen",
  already_have_an_account: "Ich habe bereits einen Account",
  invalid_credentials: "Ungültige Anmeldeinformationen",
  unknown_error: "Unbekannter Fehler",
  email_already_in_use: "Mail im Einsatz",
  signin_in: "Einloggen",
  signin_up: "Registrieren",
  registered_account: "Account erstellt",
  welcome: "Herzlich willkommen",
  verify_your_email: "Überprüfen Sie Ihre E-Mail, bevor Sie eintreten",
  sign_out: "Ausloggen",
  seller: "Verkäufer",
  buyer: "Käufer",
  role: "Rolle",
  home: "Anfang",
  chat: "Plaudern",
  write_your_message: "Schreibe deine Nachricht",
  no_messages_found: "Keine Nachrichten gefunden",
  no_pending_chats: "Sie haben keine ausstehenden Plauderns zu akzeptieren",
  wants_to_talk_with_you: "Möchte einen Plaudern mit Ihnen beginnen",
  chats_pending_to_accept: "Plauderns zu akzeptieren",
  accept: "Akzeptieren",
  empty_chats_list: "Sie haben keine Chats",
};
/** @type { z.ZodErrorMap  } */
export const zodCustomErrorMapDe = (issue, ctx) => {
  if (issue.path[0] === "confirmationPassword") {
    return { message: "Passwörter stimmen nicht überein" };
  }
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === "string") {
      return { message: "Falscher Datentyp" };
    }
  }
  if (issue.code === z.ZodIssueCode.too_small) {
    return {
      message: `Das Feld muss mindestens ${issues.minimum} Zeichen enthalten`,
    };
  }
  if (issue.code === z.ZodIssueCode.too_big) {
    return {
      message: `Das Feld darf höchstens enthalten ${issue.maximum} Zeichen enthalten`,
    };
  }
  if (issue.code === z.ZodIssueCode.invalid_string) {
    if (issue.validation === "email")
      return {
        message: "Ungültige E-Mail",
      };
  }
  if (issue.code === z.ZodIssueCode.custom) {
    return { message: `less-than-${(issue.params || {}).minimum}` };
  }
  return { message: ctx.defaultError };
};
