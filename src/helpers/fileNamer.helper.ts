import { generarId } from 'src/usuarios/helpers/generar';

export const fileNamer = ( req: Express.Request, file: Express.Multer.File, callback: Function ) => {

    // console.log({ file })
    if ( !file ) return callback( new Error('File is empty'), false );

    const fileExtension = file.mimetype.split('/')[1];

    const fileName = `${ generarId() }.${ fileExtension }`;


    callback(null, fileName );

}
