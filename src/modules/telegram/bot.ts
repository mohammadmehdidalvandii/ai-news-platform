import {Telegraf } from 'telegraf'; 
import {config} from '../../config/index';
import { socksProxyAgent } from '@lib/proxyAgent';


export const bot = new Telegraf(config.telegram.token,{telegram:{agent: socksProxyAgent}});  