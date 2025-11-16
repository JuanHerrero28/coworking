// src/services/makeService.ts
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/espacios`;

export async function makeService(
  {
    nombre,
    descripcion,
    capacidad,
    ubicacion,
    imagenUrl,
  }: {
    nombre: string;
    descripcion: string;
    capacidad: number;
    ubicacion: string;
    imagenUrl: string;
  },
  token: string
) {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 👈 token dinámico
    },
    body: JSON.stringify({
      nombre,
      descripcion,
      capacidad,
      ubicacion,
      imagenUrl,
    }),
  });

  const responseData = await res.json();

  if (!res.ok) {
    console.error("❌ Error al crear el espacio:", responseData);
    throw new Error(`No se pudo crear el espacio (${res.status})`);
  }

  return responseData;
}


//listar espacios
export const getSpace = async (token: string) => {
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
  
        // Otros errores sí deben alertar al desarrollador
        console.error("Status inesperado:", res.status);
        return null;
      }
  
      return await res.json();
    } catch (err) {
      console.error("Error de red al obtener el usuario:", err);
      return null;
    }
  };

  //Eliminar espacio
  export const eliminarEspacio = async (token: string, id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al eliminar el espacio");

  return true;
};

//actualizar espacio

export async function updateSpace(
  id: number,
  {
    nombre,
    descripcion,
    capacidad,
    ubicacion,
    imagenUrl,
  }: {
    nombre: string;
    descripcion: string;
    capacidad: number;
    ubicacion: string;
    imagenUrl: string;
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
      descripcion,
      capacidad,
      ubicacion,
      imagenUrl,
    }),
  });

  const responseData = await res.json();

  if (!res.ok) {
    console.error("❌ Error al actualizar el espacio:", responseData);
    throw new Error(`No se pudo actualizar el espacio (${res.status})`);
  }

  return responseData;
}


export const getSpaceById = async (id: number, token: string) => {
  if (!id || id <= 0) throw new Error("ID inválido");
  if (!token) throw new Error("Token inválido");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`No se pudo obtener el espacio (status: ${response.status})`);
  }

  const data = await response.json();
  return data;
};
