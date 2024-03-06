import { STORAGE, TOKEN_KEY, TOKEN_PREFIX } from "../config/settings";

const useJWT = () => {
  const get = () => {
    return `${STORAGE.getItem(TOKEN_KEY)}`
  }

  const set = (token) => {
    STORAGE.setItem(TOKEN_KEY, `${TOKEN_PREFIX} ${token}`)
  }

  const signOut = () => {
    STORAGE.setItem(TOKEN_KEY, "")
  }

  return {get, set, signOut}
}

export default useJWT;