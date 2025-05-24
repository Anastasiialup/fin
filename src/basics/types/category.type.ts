export enum CategoryTypes {
  saving = 'saving',
  spending = 'spending',
}

export type Category = {
  id: number;
  name: string;
  type: CategoryTypes;
  color: string;
  userId: number;
  createdAt: string;
};
