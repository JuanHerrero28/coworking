const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/usuarios`;
//listar usuarios
export const getUsuarios = async (token: string) => {
    try {
      const res = await fetch(`${API_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        if (res.status === 401 || res.status === 404) {
          // Token expirado o usuario no encontrado: limpiamos y salimos sin romper
          localStorage.removeItem("token");
          
          return null;
        }
  
        console.error("Status inesperado:", res.status);
        return null;
      }
  
      return await res.json();
    } catch (err) {
      console.error("Error de red al obtener el usuario:", err);
      return null;
    }
  };


  //Eliminar usuario
    export const eliminarUsuario = async (token: string, id: number) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) throw new Error("Error al eliminar el espacio");
  
    return true;
  };

  //Actualizar usuario
  export async function updateUser(
    id: number,
    {
      nombre,
      email,
      password,
      rol,
    }: {
      nombre: string;
      email: string;
      password: string
      rol?: string;
    },
    token: string
  ) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre,
        email,
        password,
        rol,
      }),
    });
  
    const responseData = await res.json();
  
    if (!res.ok) {
      console.error("❌ Error al actualizar el espacio:", responseData);
      throw new Error(`No se pudo actualizar el espacio (${res.status})`);
    }
  
    return responseData;
  }