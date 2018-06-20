// If env variable is passed in use it, otherwise default to development
const NODE_ENV = process.env.NODE_ENV || 'development';

switch (NODE_ENV) {
  default:
    process.env.PORT = 3000;
    process.env.MONGODB_URI =
      'mongodb://admin:1secret@ds263380.mlab.com:63380/303software';
    break;
  case 'development':
    process.env.PORT = 3000;
    process.env.MONGODB_URI =
      'mongodb://admin:1secret@ds263380.mlab.com:63380/303software';
    break;
  case 'test':
    process.env.PORT = 3000;
    process.env.MONGODB_URI =
      'mongodb://admin:1secret@ds163330.mlab.com:63330/303software_test';
    break;
}
