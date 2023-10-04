export function base64ToFile(base64: string) {
  const base64Data = base64.split(";base64,").pop();
  if (!base64Data) throw new Error("Invalid Base64");

  const imageBuffer = Buffer.from(base64Data, "base64");
  return imageBuffer;
}

export function getBase64FileExtension(base64: string) {
  type Extensions = {
    [key: string]: string | undefined;
  };
  const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

  if (matches && matches.length === 3) {
    const mimeType = matches[1];
    const base64String = matches[2];

    // 根据MIME类型解析文件后缀
    const extensions: Extensions = {
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
      "image/png": "png",
      "image/gif": "gif",
      // 可以添加更多的MIME类型和对应的后缀
    };

    return extensions[mimeType] || null;
  }

  return null;
}
