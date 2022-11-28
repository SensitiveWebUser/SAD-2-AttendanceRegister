import {
  Tutor,
  TutorConstructorParams,
  UserToJsonReturn,
  Course,
} from '../models';

import { Course as CourseSchema } from '../database';

export class CourseLeader extends Tutor {
  courseId: string;

  constructor({ userObject, courseId }: constructorParams) {
    super({ userObject });
    this.courseId = courseId;
  }

  // getters

  public getCourse = async (): Promise<Course> => {
    const courseRecord = await CourseSchema.findByPk(this.courseId);

    const course = new Course({
      id: courseRecord!.dataValues.id,
      name: courseRecord!.dataValues.name,
      courseLeader: this,
    });

    return course;
  };

  // setters

  // methods

  async toJsonAsync(): Promise<toJsonReturn> {
    return {
      ...(await super.toJsonAsync()),
      course: await this.getCourse(),
    };
  }
}

interface toJsonReturn extends UserToJsonReturn {
  course: object;
}

interface constructorParams extends TutorConstructorParams {
  courseId: string;
}
