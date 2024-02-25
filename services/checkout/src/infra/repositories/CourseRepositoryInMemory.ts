import CourseRepository from '../../application/repositories/CourseRepository';
import Course from '../../domain/entities/Course';

export default class CourseRepositoryInMemory implements CourseRepository {
  private courses: Course[] = [];

  constructor() {
    this.courses.push(
      new Course(
        '83e88f3a-49a5-43e0-a07a-8dd9e64c0915',
        'Clean Code e Clean Architecture',
        1199
      )
    );
  }
  async findById(courseId: string): Promise<Course> {
    const course = this.courses.find((course) => course.courseId === courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    return new Course(course.courseId, course.title, course.amount);
  }
}
