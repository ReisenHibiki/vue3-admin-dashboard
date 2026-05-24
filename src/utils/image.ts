
// // TS重构，避免传参错误
export const getImageUrl = (imageName: string): string => {
  return new URL(`../assets/images/${imageName}.png`, import.meta.url).href
}