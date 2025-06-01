export interface RegisterRequest {
  name: string;
  email: string;
  cpf: string;
  password: string;
  isClient: boolean;
  isProfessional: boolean;
}