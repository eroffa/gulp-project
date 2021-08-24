import del from 'del';
import config from '../config';

const clear = () => del(config.dist.root);

export default clear;
