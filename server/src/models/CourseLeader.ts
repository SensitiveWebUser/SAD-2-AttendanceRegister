import {
  Course,
  Tutor,
  TutorConstructorParams,
  UserToJsonReturn,
} from '../models';

import { Course as CourseSchema } from '../database';

export class CourseLeader extends Tutor {
  private courseId: string;

  constructor({ userObject, courseId }: constructorParams) {
    super({ userObject });
    this.courseId = courseId;
  }

  public getCourseAsync = async (): Promise<Course> => {
    const courseRecord = await CourseSchema.findByPk(this.courseId);

    const course = new Course({
      id: courseRecord!.dataValues.course_id,
      name: courseRecord!.dataValues.course_name,
      courseLeader: this,
    });

    return course;
  };

  async toJsonAsync(): Promise<toJsonReturn> {
    return {
      ...(await super.toJsonAsync()),
      course: await this.getCourseAsync(),
    };
  }
}

interface toJsonReturn extends UserToJsonReturn {
  course: object;
}

interface constructorParams extends TutorConstructorParams {
  courseId: string;
}
