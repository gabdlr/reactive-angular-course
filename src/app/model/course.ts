export enum Category {
  BEGINNER='BEGINNER',
  ADVANCED='ADVANCED'
}
export interface Course {
  id: string;
  description: string;
  longDescription: string;
  seqNo: number;
  iconUrl: string;
  price: number;
  uploadedImageUrl: string;
  courseListIcon: string;
  category: Category;
  lessonsCount: number;
}


export function sortCoursesBySeqNo(c1: Course, c2: Course) {
  return c1.seqNo - c2.seqNo;
}
