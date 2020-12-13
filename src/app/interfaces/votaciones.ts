export interface Votaciones {
    id: string;
    tipo: string; // 10 privada 20 publica
    codigoAcceso: string;
    codigoConsejo: string;
    descripcion: string;
    nombrePropuso: string;
    date: string;
    favor: 0;
    encontra: 0;
    abstencion: 0;
    status: string; // 0 pausada 1 abierta 2 cerrada
    votantes: [{}];
}