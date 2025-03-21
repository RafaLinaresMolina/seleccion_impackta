import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance, ClassConstructor } from 'class-transformer';

export function validateDto<T extends object>(dtoClass: ClassConstructor<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(dtoClass, req.body);
    
    const errors = await validate(dtoObject, { 
      whitelist: true,
      forbidNonWhitelisted: true
    });
    
    if (errors.length > 0) {
      const validationErrors = errors.reduce((acc, err: ValidationError) => {
        const property = err.property;
        const constraints = err.constraints ? Object.values(err.constraints) : [];
        
        acc[property] = constraints;
        return acc;
      }, {} as Record<string, string[]>);
      
      console.error(`Validation failed: `, {validationErrors})
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    
    req.body = dtoObject;
    next();
  };
}