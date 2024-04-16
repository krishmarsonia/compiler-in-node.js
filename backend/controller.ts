import { NextFunction, Request, Response } from "express";
import { generateGoFile } from "./generateGoFile";
import { executeGoCode } from "./executeGo";

interface err extends Error {
  statusCode: number;
  message: string;
}

export const parseCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { format = "go", code } = req.body;
  if (!code) {
    const err = new Error("No code provided") as err;
    err.statusCode = 422;
    next(err);
  }
  try {
    const { storagePath, codeId } = await generateGoFile(format, code);
    const result = await executeGoCode(storagePath, codeId);
    console.log(result);
    res.json(result);
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};
