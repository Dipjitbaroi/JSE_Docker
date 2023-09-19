import multer from 'multer'
import path from 'path'

// export const uploadProductfiles = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'files/usersfiles/');
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname));
//     }
//   })
// });

export const uploadUserfiles = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'files/userfiles/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  })
});