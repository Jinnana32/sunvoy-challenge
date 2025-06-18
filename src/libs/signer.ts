import crypto from 'crypto';
import { SignedRequest } from '../types';

/**
 * Reverse engineered from the original minified bundle:
 *
 * , function(t, e, i) {
 *   const r = i(94);
 *   t.exports = {
 *     createSignedRequest: function(t) {
 *       const e = Math.floor(Date.now() / 1e3),
 *             i = { ...t, timestamp: e.toString() },
 *             n = Object.keys(i).sort().map(t => `${t}=${encodeURIComponent(i[t])}`).join("&"),
 *             o = r.createHmac("sha1", "mys3cr3t");
 *       o.update(n);
 *       const h = o.digest("hex").toUpperCase();
 *       return {
 *         payload: n,
 *         checkcode: h,
 *         fullPayload: `${n}&checkcode=${h}`,
 *         timestamp: e
 *       }
 *     }
 *   }
 * }
 *
 * Refactored for clarity and typed for TypeScript.
 */
export const createSignedRequest = (
  payload: Record<string, string>
): SignedRequest => {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const fullPayload: Record<string, string> = { ...payload, timestamp };
  const sorted = Object.keys(fullPayload)
    .sort()
    .map((key) => `${key}=${encodeURIComponent(fullPayload[key])}`)
    .join('&');

  const hmac = crypto
    .createHmac('sha1', 'mys3cr3t')
    .update(sorted)
    .digest('hex')
    .toUpperCase();

  return {
    fullPayload: `${sorted}&checkcode=${hmac}`,
  };
};
