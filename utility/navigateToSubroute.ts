export function navigateToSubroute(
  fullPath: string,
  sliceEnd: number,
  text: string
): void {
  navigateTo(fullPath.split('/').slice(0, sliceEnd).join('/') + '/' + text);
}
