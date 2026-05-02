import LZString from 'lz-string';

export const strEncode = (str) => LZString.compressToEncodedURIComponent(str)
export const strDecode = (str) =>  LZString.decompressFromEncodedURIComponent(str)
