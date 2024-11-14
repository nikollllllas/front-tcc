export async function signOut() {
  localStorage.removeItem("authToken")
}
