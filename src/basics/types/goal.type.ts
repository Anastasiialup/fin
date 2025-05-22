export type Goal = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  status: GoalStatuses;
  photo: string | null;
  userId: string;
};

export enum GoalStatuses {
  not_completed = 'not_completed',
  achieved = 'achieved',
}
