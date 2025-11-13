export const fileFilter = ( req: Express.Request, file: Express.Multer.File, callback: Function ) => {

    if (!file.mimetype.startsWith('image/')) return callback(new Error('Solo se permiten imágenes'), false)
    const fileExptension = file.mimetype.split('/')[1];
    const validExtensions = ['jpg','jpeg','png','gif'];

    if (  validExtensions.includes( fileExptension ) ) {
        return callback( null, true )
    }
    callback(null, false );
}
