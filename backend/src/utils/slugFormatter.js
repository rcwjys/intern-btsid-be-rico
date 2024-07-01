import { ValidationError } from "./error.js";

export function slugFormatter(title) {
  if (title.includes("-")) {
    throw new ValidationError("invalid title format", 400);
  }
  return title.split(' ').join('-').toString();
}