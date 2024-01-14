export interface IAddress {
  _id: string;
  name: string;
  surname: string;
  email: string;
  userId: string;
  phone: { countryCode?: string; number?: string };
}

export interface ICreateAddress {
  name: string;
  surname: string;
  email: string;
  phone: {
    countryCode: string;
    number: string;
  };
}
