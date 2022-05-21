import { post } from 'utils/http';

export async function validate(user: any) {
  return post(`/user`, user);
}
