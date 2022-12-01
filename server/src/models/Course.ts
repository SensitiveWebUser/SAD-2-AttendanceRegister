import { CourseLeader, Tutor, User, Module } from '../models';
import {
  Course as CourseSchema,
  ModuleCourseLink as ModuleCourseLinkSchema,
  Module as ModuleSchema,
  User as UserSchema,
} from '../database';

export class Course {
  private id: string;
  private name: string;
  private courseLeader: CourseLeader;

  constructor({ id, name, courseLeader }: constructorParams) {
    this.id = id;
    this.name = name;
    this.courseLeader = courseLeader;
  }

  public get getId(): string {
    return this.id;
  }

  public get getName(): string {
    return this.name;
  }

  public get getCourseLeader(): CourseLeader {
    return this.courseLeader;
  }

  public set setName(name: string) {
    this.name = name;
  }

  public set setCourseLeader(courseLeader: CourseLeader) {
    this.courseLeader = courseLeader;
  }

  public async getModulesAsync(): Promise<Module[]> {
    const moduleRecords = await ModuleCourseLinkSchema.findAll({
      where: {
        course_id: this.id,
      },
    });

    return Promise.all(
      moduleRecords.map(async (module) => {
        const moduleRecord = await ModuleSchema.findOne({
          where: {
            module_id: module.dataValues.module_id,
          },
        });

        if (!moduleRecord) throw new Error('module not found');

        const moduleLeaderRecord = await UserSchema.findOne({
          where: {
            user_id: moduleRecord.dataValues.module_leader_id,
          },
        });

        if (!moduleLeaderRecord) throw new Error('module leader not found');

        const moduleLeader = new Tutor({
          userObject: new User({
            id: moduleLeaderRecord.dataValues.user_id,
            type: moduleLeaderRecord.dataValues.user_type_id,
            firstName: moduleLeaderRecord.dataValues.first_name,
            middleName: moduleLeaderRecord.dataValues.middle_name,
            lastName: moduleLeaderRecord.dataValues.last_name,
            email: moduleLeaderRecord.dataValues.email,
          }),
        });

        return new Module({
          id: moduleRecord.dataValues.module_id,
          name: moduleRecord.dataValues.module_name,
          moduleLeader: moduleLeader,
        });
      })
    );
  }

  public updateDatabaseAsync = async (): Promise<boolean> => {
    const course = await CourseSchema.findByPk(this.getId);

    if (!course) return false;

    await course
      .update({
        name: this.name,
        courseLeaderId: this.courseLeader.getId,
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
      courseLeader: await this.courseLeader.toJsonAsync(),
      modules: await Promise.all(
        (await this.getModulesAsync()).map((module) => module.toJsonAsync())
      ),
    };
  }
}

interface toJsonReturn {
  id: string;
  name: string;
  courseLeader: object;
  modules: object[];
}

interface constructorParams {
  id: string;
  name: string;
  courseLeader: CourseLeader;
}
