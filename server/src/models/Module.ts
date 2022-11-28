import { Tutor } from '../models';
import { Module as ModuleSchema } from '../database';

export class Module {
  id: number;
  name: string;
  moduleLeader: Tutor;

  constructor({ id, name, moduleLeader }: constructorParams) {
    this.id = id;
    this.name = name;
    this.moduleLeader = moduleLeader;
  }

  // getters
  public get getId(): number {
    return this.id;
  }

  public get getName(): string {
    return this.name;
  }

  public get getModuleLeader(): Tutor {
    return this.moduleLeader;
  }

  // setters

  public set setName(name: string) {
    this.name = name;
  }

  public set setModuleLeader(moduleLeader: Tutor) {
    this.moduleLeader = moduleLeader;
  }

  // methods

  public updateDatabaseAsync = async (): Promise<boolean> => {
    const module = await ModuleSchema.findByPk(this.getId);

    if (!module) return false;

    await module
      .update({
        name: this.name,
        moduleLeaderId: this.moduleLeader.getId,
      })
      .catch(() => {
        return false;
      });

    return true;
  };

  async toJsonAsync(): Promise<toJsonReturn> {
    return {
      id: this.id,
      name: this.name,
      moduleLeader: await this.moduleLeader.toJsonAsync(),
    };
  }
}

interface toJsonReturn {
  id: number;
  name: string;
  moduleLeader: object;
}

interface constructorParams {
  id: number;
  name: string;
  moduleLeader: Tutor;
}
