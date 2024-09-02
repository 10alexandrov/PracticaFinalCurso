import { Pipe, PipeTransform } from '@angular/core';
import { IUsuarios } from '../interfaces/iusuarios';

@Pipe({
  name: 'iusuariosFilter',
  standalone: true
})
export class IusuariosFilterPipe implements PipeTransform {

  transform(usuarios: IUsuarios[], filterBy: string, role: string): IUsuarios[] {
    const filter = filterBy ? filterBy.toLocaleLowerCase() : null;

    if(filter && !role) {
      return usuarios.filter(usuario => usuario.u_nombre.toLocaleLowerCase().includes(filter));
    }
    if (filter && role) {
      return usuarios.filter(usuario =>
        usuario.u_role == role && usuario.u_nombre.toLocaleLowerCase().includes(filter)
      );
    }

    if (!filter && role) {
      return usuarios.filter(usuario => usuario.u_role == role);
    }

    return usuarios;
  }

}
