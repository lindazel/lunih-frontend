import { Industry } from "./categories/industry.model";
import { PostType } from "./categories/post-type.model";
import { Deliverable } from "./deliverable.model";
import { Account } from "./users/account.model";
import { Student } from "./users/student.model";

export class Post {
  id!: number;
  postType!: PostType;
  titleEn!: string;
  titleLv!: string;
  descriptionEn!: string;
  descriptionLv!: string;
  industryList!: Industry[];
  startDate!: Date;
  endDate!: Date;
  numSlot!: number;
  studentList?: Student[];
  queueList?: Student[];
  leader?: Student;
  deliverables?: Deliverable[];
  author?: Account;
  status!: boolean;
}