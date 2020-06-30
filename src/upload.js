import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const s3 = new aws.S3({accessKeyId: process.env.AMAZON_KEY, secretAccessKey: process.env.AMAZON_SECRET});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'prismaupload',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  }),
});
export const uploadMiddleware = upload.single('file');

export const uploadController = (req, res) => {
  const {file:{location}} = req;
  res.json({location})
};

