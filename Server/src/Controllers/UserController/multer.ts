import multer from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
    destination: (req: Request, file: any, cb: any) => {  
        cb(null, 'C:/Project/Mini-Project/Client/public/docs');
    },
    filename: (req: Request, file: any, cb: any) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const multerFilter = (req: Request, file: any, cb: any) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'application/pdf'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: multerFilter });

export default upload;
