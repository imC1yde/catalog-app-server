import { User } from '@src/common/types/user.type'

export const mapUser = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  profileImage: user.profileImage
}) as User