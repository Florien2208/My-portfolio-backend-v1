export interface IReference {
  title: string;
  name: string;
  description: string;
  profile: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateReference
  extends Omit<IReference, "createdAt" | "updatedAt"> {}
export interface IUpdateReference extends Partial<ICreateReference> {}
