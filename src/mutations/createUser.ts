import { hashPassword } from "../modules/auth.js";
import { MutationResolvers } from "../types.js";

export const createUser: MutationResolvers['createUser'] = async (_, { username, password }, { dataSources }) => {
  try {
    const checkedUsername = checkUsername(username)
    const checkedPassword = checkPassword(password)
    
    if(!checkedUsername){
      throw new Error('Username must contain at least 6 characters')
    }

    if(!checkedPassword){
      throw new Error('The password must contain at least one capital letter, one special character and one number.')
    }
    
    const createdUser = await dataSources.db.user.create({
      data: { username, password: await hashPassword(password) },
    });

    return {
      code: 201,
      message: 'User has been created',
      success: true,
      user: {
        id: createdUser.id,
        username: createdUser.username
      }
    }
  } catch (e) {
    return {
      code: 400,
      message: (e as Error).message,
      success: false,
      user: null
    }
  }
}

function checkUsername(username: string): boolean {
  if (username.length < 6) {
    return false;
  }
  return true;
}

function checkPassword(password: string): boolean {
  const uppercaseRegex = /[A-Z]/;
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  const digitRegex = /[0-9]/;

  if (!uppercaseRegex.test(password) || !specialCharRegex.test(password) || !digitRegex.test(password)) {
    return false;
  }

  return true;
}