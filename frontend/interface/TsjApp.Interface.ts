export interface IDep {
  id?: number;
  edificio: { id: number };
  nombre: string;
  domicilio: string;
}
export interface IEdi {
  id?: number;
  nombre: string;
  domicilio: string;
  dependencia?: [IDep];
}

export interface IDependencia {
  id?: number;
  edificio: { id: number };
  nombre: string;
  domicilio: string;
}
