export function slugFormatter(title) {
  return title.split(' ').join('-').toString();
}