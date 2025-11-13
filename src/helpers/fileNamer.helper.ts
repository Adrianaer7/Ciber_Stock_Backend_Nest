import { generarId } from 'src/usuarios/helpers/generar';

export const fileNamer = ( req: Express.Request, file: Express.Multer.File, callback: Function ) => {
    const fileExtension = file.mimetype.split('/')[1];  //devuelve algo como "image/jpeg"
    const fileName = `${ generarId() }.${ fileExtension }`;
    callback(null, fileName );
}
