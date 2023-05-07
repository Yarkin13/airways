export interface UserCredential {
  email: string;
  password: string;
}

export interface UserRegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  countryCode: string;
  phone: string;
  citizenship: string;
  gender: string;
}
