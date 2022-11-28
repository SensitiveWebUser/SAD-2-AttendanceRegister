import { UserType as UserTypeSchema } from '../database';

export class UserType {
  id: string;
  name: string;

  constructor({ id, name }: constructorParams) {
    this.id = id;
    this.name = name;
  }

  // getters
  public get getId(): string {
    return this.id;
  }

  public get getName(): string {
    return this.name;
  }

  // setters
  public set setName(name: string) {
    this.name = name;
  }

  // methods

  public updateDatabaseAsync = async (): Promise<boolean> => {
    const userType = await UserTypeSchema.findByPk(this.getId);

    if (!userType) return false;

    await userType
      .update({
        name: this.name,
      })
      .catch(() => {
        return false;
      });

    return true;
  };

  // methods
  toJson(): toJsonReturn {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

interface toJsonReturn {
  id: string;
  name: string;
}

interface constructorParams {
  id: string;
  name: string;
}
