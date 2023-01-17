import { diskStorage } from "multer";
import { v4 as uuidv4 } from 'uuid';

const fs = require('fs');
const FilteType = require('file-type')

import path = require('path');

type validFileExtensions = 'png' | 'jpg' | 'jpeg';
type validMimeTypes = 'image/png' | 'image/jpg' | 'image/jpeg';

const validFileExtension: validFileExtensions[] = ['png', 'jpg', 'jpeg'];
const validMimeType: validMimeTypes[] = [
    'image/png', 
    'image/jpg', 
    'image/jpeg'
]

export const saveToImageStorage = {

}




