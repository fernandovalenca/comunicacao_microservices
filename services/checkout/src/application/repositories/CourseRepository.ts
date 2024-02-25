import Course from '../../domain/entities/Course';

export default interface CourseRepository {
  findById: (id: string) => Promise<Course>;
}
