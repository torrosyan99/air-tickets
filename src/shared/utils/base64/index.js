
export const encodeBase64 = (data) => {
  return new URLSearchParams(data)
};

export const decodeBase64 = (str) => {
  const binary = atob(str);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};