import { SessionType as sessionTypeSchema } from '../database';

export class SessionType {
  id: string;
  name: string;

  constructor({ id, name }: constructorParams) {
    this.id = id;
    this.name = name;
  }

  //getters
  public get getId(): string {
    return this.id;
  }

  public get getName(): string {
    return this.name;
  }

  //setters

  public set setName(name: string) {
    this.name = name;
  }

  //methods

  public updateDatabaseAsync = async (): Promise<boolean> => {
    const sessionType = await sessionTypeSchema.findByPk(this.getId);

    if (!sessionType) return false;

    await sessionType
      .update({
        name: this.name,
      })
      .catch(() => {
        return false;
      });

    return true;
  };

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
