import { http } from '@/utils/http';
import CryptoJS from 'crypto-js';

// 处理和计算签名
var date = new Date();
const { enc, HmacSHA256 } = CryptoJS;

let nonce = generateRandomString(8);
let query = {
  'requestId': Uuid()
};
let method = 'POST';
let uri = '/vivogpt/completions';
let canonical_query_string = genCanonicalQueryString(query);
let app_id = '3034519046';
const timestamp = Math.floor(date.getTime() / 1000).toString();
let appkey = 'UzjvegrdtmRtbYjK';
let signed_headers_string = `x-ai-gateway-app-id:${app_id}
x-ai-gateway-timestamp:${timestamp}
x-ai-gateway-nonce:${nonce}`;
let signing_string = `${method}
${uri}
${canonical_query_string}
${app_id}
${timestamp}
${signed_headers_string}`;
let signature = generate_signature(appkey, signing_string);

function generate_signature(app_key, signing_string){
    const hmacSha256Hex = HmacSHA256(signing_string,app_key).toString(enc.Hex);
    const signature = Buffer.from(hmacSha256Hex,'hex').toString('base64');
    return signature;
};

function Uuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
};

function generateRandomString(length = 8) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

function genCanonicalQueryString(params) {
    if (params) {
        let escapeUri = encodeURIComponent;
        let raw = [];
        for (let k in params) {
            let tmpTuple = [escapeUri(k), escapeUri(params[k].toString())];
            raw.push(tmpTuple);
        }
        let s = raw.map(kv => kv.join('=')).join('&');
        return s;
    } else {
        return '';
    }
};

export const getAnswerAPI = (prompt) => {
  return http({
    method: method,
    url: '/vivogpt/completions?requestId=' + query['requestId'],
	header: {
	    "Content-Type": 'application/json',
		"X-AI-GATEWAY-APP-ID": app_id,
		"X-AI-GATEWAY-TIMESTAMP": timestamp,
		"X-AI-GATEWAY-NONCE": nonce,
		"X-AI-GATEWAY-SIGNED-HEADERS": "x-ai-gateway-app-id;x-ai-gateway-timestamp;x-ai-gateway-nonce",
		"X-AI-GATEWAY-SIGNATURE": signature,
	},
	data: {
    'prompt': prompt,
    'model': 'vivo-BlueLM-TB',
    'sessionId': Uuid(),
    'systemPrompt': '你的中文名字叫耕农千问，当回复问题时需要回复你的名字时，中文名必须回复农耕千问，是处理农业问题的智能助手，此外回复和你的名字相关的问题时，也需要给出和你的名字对应的合理回复。',
    'extra': {
        'temperature': 0.9
		}
	}
  })
}
