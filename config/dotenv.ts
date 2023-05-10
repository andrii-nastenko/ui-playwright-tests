import * as path from 'path';
import {config} from 'dotenv';

export default config({
  path: path.resolve(process.cwd(), process.env.CI ? '.env.example' : '.env.example'),
});
