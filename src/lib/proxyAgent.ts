import { SocksProxyAgent } from 'socks-proxy-agent';
import { ProxyAgent } from 'undici';


export const socksProxyAgent = new SocksProxyAgent('socks5://127.0.0.1:10808');

export const undiciProxyAgent = new ProxyAgent('http://127.0.0.1:10808');