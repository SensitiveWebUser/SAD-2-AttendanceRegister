import { CourseLeader } from '../models';
import { Course as CourseSchema } from '../database';

export class Course {
  id: number;
  name: string;
  courseLeader: CourseLeader;

  constructor({ id, name, courseLeader }: constructorParams) {
    this.id = id;
    this.name = name;
    this.courseLeader = courseLeader;
  }

  // getters
  public get getId(): number {
    return this.id;
  }

  public get getName(): string {
    return this.name;
  }

  public get getCourseLeader(): CourseLeader {
    return this.courseLeader;
  }

  // setters

  public set setName(name: string) {
    this.name = name;
  }

  public set setCourseLeader(courseLeader: CourseLeader) {
    this.courseLeader = courseLeader;
  }

  // methods

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
    };
  }
}

interface toJsonReturn {
  id: number;
  name: string;
  courseLeader: object;
}

interface constructorParams {
  id: number;
  name: string;
  courseLeader: CourseLeader;
}
