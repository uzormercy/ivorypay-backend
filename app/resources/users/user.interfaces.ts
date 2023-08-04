export interface updateUserDtoInterface {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface loginUserDtoInterface {
  email: string;
  password: string;
}
