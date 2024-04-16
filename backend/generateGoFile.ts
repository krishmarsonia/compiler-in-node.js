import path from "path";
import fs from "fs";
import { v4 } from "uuid";

const codeDirectory = path.join(__dirname, "codes");

if (!fs.existsSync(codeDirectory)) {
  fs.mkdirSync(codeDirectory, { recursive: true });
}

export const generateGoFile = async (
  format: string,
  code: string
): Promise<{
  storagePath: string;
  codeId: string;
}> => {
  const codeId = v4();
  const fileName = `${codeId}.${format}`;
  const codeFolder = path.join(codeDirectory, codeId);
  fs.mkdirSync(codeFolder, { recursive: true });
  const storagePath = path.join(codeFolder, fileName);
  await fs.writeFileSync(storagePath, code);
  return { storagePath, codeId };
};
