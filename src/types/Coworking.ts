export type Space = {
  id: number;
  nombre: string;
  descripcion: string;
  capacidad: number;
  ubicacion: string;
  imagenUrl: string;
};

export type User = {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: string;
};


