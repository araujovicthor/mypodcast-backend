interface ICategory {
  categoryId: string;
}

export default interface ICreateChannelDTO {
  ownerId: string;
  name: string;
  description: string;
  categories: ICategory[];
}
