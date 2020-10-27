export interface Course {
  id: string;
  name: string;
  section: string;
  descriptionHeading: string;
  description: string;
  room: string;
  ownerId: string;
  creationTime: string;
  updateTime: string;
  enrollmentCode: string;
  courseState: CourseState;
  alternateLink: string;
  teacherGroupEmail: string;
  courseGroupEmail: string;
  guardiansEnabled: boolean;
  calendarId: string;
  teacherFolder: DriveFolder;
  courseMaterialSets: CourseMaterialSet[];
}
export enum CourseState {
  COURSE_STATE_UNSPECIFIED,
  ACTIVE,
  ARCHIVED,
  PROVISIONED,
  DECLINED,
  SUSPENDED,
}
export interface DriveFolder {
  id: string;
  title: string;
  alternateLink: string;
}
export interface CourseMaterialSet {
  title: string;
  materials: CourseMaterial[];
}
export interface CourseMaterial {
  driveFile: DriveFile;
  youTubeVideo: YouTubeVideo;
  link: Link;
  form: Form;
}
export interface YouTubeVideo {
  id: string;
  title: string;
  alternateLink: string;
  thumbnailUrl: string;
}
export interface DriveFile {
  id: string;
  title: string;
  alternateLink: string;
  thumbnailUrl: string;
}
export interface Link {
  url: string;
  title: string;
  thumbnailUrl: string;
}
export interface Form {
  formUrl: string;
  responseUrl: string;
  title: string;
  thumbnailUrl: string;
}
