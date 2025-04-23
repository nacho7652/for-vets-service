import { CompanyRequest } from './company';

export interface ClientRequest {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    rut: string;
    cellphone: string;
    address: string;
    pets_owner: boolean;
    role_id: number;
    companies: CompanyRequest[];
  }