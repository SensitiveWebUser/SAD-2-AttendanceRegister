import { UserType } from '../../database';
import { userTypeEnum } from '../../utils/userTypeEnum';

export async function generateUserTypeAsync(userTypeEnum: userTypeEnum) {
  const userType = await UserType.create({
    user_type_name: userTypeEnum,
  });

  return userType;
}
