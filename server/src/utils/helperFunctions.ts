export default abstract class helperFunctions {
  public static formatName(
    firstName: string,
    middleName: string,
    lastName: string
  ): string {
    return `${firstName} ${middleName} ${lastName}`;
  }
}
