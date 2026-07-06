import {Telegraf } from 'telegraf'; 
import {SocksProxyAgent} from 'socks-proxy-agent';
import {config} from '../../config/index';

const agent = new SocksProxyAgent('socks5://127.0.0.1:10808');

export const bot = new Telegraf(config.telegram.token,{telegram:{agent}});  