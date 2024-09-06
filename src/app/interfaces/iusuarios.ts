export interface IUsuarios {
  usuario_id?: number;
  u_nombre: string;
  u_login: string;
  u_password: string;
  u_role: string;
  u_active: boolean;
  created_at?: Date;
}
