
export const getImageUrl = (user) => {
  return new URL(`../assets/images/${user}.png`, import.meta.url).href
}