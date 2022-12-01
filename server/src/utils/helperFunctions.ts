export default abstract class helperFunctions {
  public static formatName(
    firstName: string,
    middleName: string | undefined,
    lastName: string
  ): string {
    if (middleName === undefined || middleName === '') {
      return `${firstName} ${lastName}`;
    }
    return `${firstName} ${middleName} ${lastName}`;
  }
}
