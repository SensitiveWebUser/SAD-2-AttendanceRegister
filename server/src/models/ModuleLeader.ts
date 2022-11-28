import {
  Tutor,
  Module,
  TutorConstructorParams,
  TutorToJsonReturn,
} from '../models';

import { Module as ModuleSchema } from '../database';

export class ModuleLeader extends Tutor {
  moduleId: string;

  constructor({ userObject, moduleId }: constructorParams) {
    super({ userObject });
    this.moduleId = moduleId;
  }

  // getters

  public get getModuleId(): string {
    return this.moduleId;
  }

  // setters

  // methods

  async getModule(): Promise<Module> {
    const moduleRecord = await ModuleSchema.findOne({
      where: {
        moduleLeaderId: this.getId,
      },
    });

    return new Module({
      id: moduleRecord!.dataValues.id,
      name: moduleRecord!.dataValues.name,
      moduleLeader: this,
    });
  }

  async toJsonAsync(): Promise<toJsonReturn> {
    const tutor = await super.toJsonAsync();

    return {
      ...tutor,
      moduleId: this.getModuleId,
    };
  }
}

interface toJsonReturn extends TutorToJsonReturn {
  moduleId: string;
}

interface constructorParams extends TutorConstructorParams {
  moduleId: string;
}
