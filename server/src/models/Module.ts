import { Module as ModuleSchema, Session as SessionSchema } from '../database';
import { Tutor, Session } from '../models';

export class Module {
  private id: number;
  private name: string;
  private moduleLeader: Tutor;

  constructor({ id, name, moduleLeader }: constructorParams) {
    this.id = id;
    this.name = name;
    this.moduleLeader = moduleLeader;
  }

  public get getId(): number {
    return this.id;
  }

  public get getName(): string {
    return this.name;
  }

  public get getModuleLeader(): Tutor {
    return this.moduleLeader;
  }

  public set setName(name: string) {
    this.name = name;
  }

  public set setModuleLeader(moduleLeader: Tutor) {
    this.moduleLeader = moduleLeader;
  }

  public async getModuleSessionsAsync(): Promise<Session[]> {
    const sessionRecords = await SessionSchema.findAll({
      where: {
        module_id: this.id,
      },
    });

    if (!sessionRecords) throw new Error('no sessions found');

    console.log(sessionRecords);

    return Promise.all(
      sessionRecords.map(async (session) => {
        return new Session({
          id: session.dataValues.session_id,
          type: session.dataValues.session_type_id,
          moduleId: session.dataValues.module_id,
          startTimestamp: session.dataValues.start_timestamp,
          endTimestamp: session.dataValues.end_timestamp,
          code: session.dataValues.code,
        });
      })
    );
  }

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
      sessions: await this.getModuleSessionsAsync().then((sessions) => {
        return Promise.all(
          sessions.map(async (session) => {
            return await session.toJsonAsync();
          })
        );
      }),
    };
  }
}

interface toJsonReturn {
  id: number;
  name: string;
  moduleLeader: object;
  sessions: object[];
}

interface constructorParams {
  id: number;
  name: string;
  moduleLeader: Tutor;
}
