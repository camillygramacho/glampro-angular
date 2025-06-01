export interface JwtResponse {
  token: string;
  username: string;
  authorities: { authority: string }[];
}