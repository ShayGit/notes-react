import api from "./server";

export const signinApi = async ({ username, password }) =>
  await api.post("/auth/login", {
    username,
    password,
  });

export const signupApi = async ({ username, password }) =>
  await api.post("/auth/register", {
    username,
    password,
  });

export const getNotes = async (token) =>
  await api.get("/notes", { headers: { Authorization: `Bearer ${token}` } });

export const addNote = async (note, token) =>
  await api.post("/notes", note, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateNote = async (note, token) =>
  await api.put("/notes", note, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteNote = async (note, token) =>
await api.delete("/notes", {
    headers: { Authorization: `Bearer ${token}` },
   data:{
      ...note
}});
 
