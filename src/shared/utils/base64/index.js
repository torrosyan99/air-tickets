export const encodeBase64 = (str) => {
  return btoa(new TextEncoder().encode(str)
    .reduce((data, byte) => data + String.fromCharCode(byte), ''));
};

export const decodeBase64 = (str) => {
  const binary = atob(str);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};