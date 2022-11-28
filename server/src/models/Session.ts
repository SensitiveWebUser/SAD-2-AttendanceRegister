import { Module, SessionType } from '../models';
import {
  Session as SessionSchema,
  SessionType as SessionTypeSchema,
  Module as ModuleSchema,
} from '../database';

export class Session {
  id: string;
  type: string;
  moduleId: string;
  startTimestamp: Date;
  endTimestamp: Date;
  code: string;

  constructor({
    id,
    type,
    moduleId,
    startTimestamp,
    endTimestamp,
    code,
  }: constructorParams) {
    this.id = id;
    this.type = type;
    this.moduleId = moduleId;
    this.startTimestamp = startTimestamp;
    this.endTimestamp = endTimestamp;
    this.code = code;
  }

  // getters

  public getId = (): string => this.id;

  public getType = async (): Promise<SessionType> => {
    const sessionTypeRecord = await SessionTypeSchema.findByPk(this.type);

    const type = new SessionType({
      id: sessionTypeRecord!.dataValues.session_type_id,
      name: sessionTypeRecord!.dataValues.session_type_name,
    });

    return type;
  };

  public getModuleId = (): string => this.moduleId;

  public getStartTimestamp = (): Date => this.startTimestamp;

  public getEndTimestamp = (): Date => this.endTimestamp;

  public getCode = (): string => this.code;

  // setters

  public setId = (id: string): void => {
    this.id = id;
  };

  public setStartTimestamp = (startTimestamp: Date): void => {
    this.startTimestamp = startTimestamp;
  };

  public setEndTimestamp = (endTimestamp: Date): void => {
    this.endTimestamp = endTimestamp;
  };

  // methods

  public updateDatabaseAsync = async (): Promise<boolean> => {
    const session = await SessionSchema.findByPk(this.getId());

    if (!session) return false;

    await session
      .update({
        type: this.type,
        moduleId: this.moduleId,
        startTimestamp: this.startTimestamp,
        endTimestamp: this.endTimestamp,
        code: this.code,
      })
      .catch(() => {
        return false;
      });

    return true;
  };

  public getModule = async (): Promise<Module | null> => {
    const moduleRecord = await ModuleSchema.findOne({
      where: {
        module_id: this.getModuleId,
      },
    });

    if (!moduleRecord) return null;

    return new Module({
      id: moduleRecord.dataValues.module_id,
      name: moduleRecord.dataValues.module_name,
      moduleLeader: moduleRecord.dataValues.module_leader_id,
    });
  };

  async toJsonAsync(): Promise<toJsonReturn> {
    return {
      id: this.getId(),
      type: await this.getType().then((type) => type.getName),
      moduleId: this.getModuleId(),
      startTime: this.startTimestamp,
      endTime: this.endTimestamp,
    };
  }
}

interface toJsonReturn {
  id: string;
  type: string;
  moduleId: string;
  startTime: Date;
  endTime: Date;
}

interface constructorParams {
  id: string;
  type: string;
  moduleId: string;
  startTimestamp: Date;
  endTimestamp: Date;
  code: string;
}
