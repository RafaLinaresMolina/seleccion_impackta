import { Expose } from 'class-transformer';
import { 
    IsNotEmpty, 
    IsString, 
    IsNumber, 
    IsUrl, 
    IsPositive, 
    IsInt, 
    Min, 
    MaxLength 
  } from 'class-validator';
  
  export class PokemonDto {
    @Expose({name: 'name'})
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name!: string;
  
    @Expose({name: 'height'})
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    height!: number;
  
    @Expose({name: 'number'})
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    number!: number;
  
    @Expose({name: 'health'})
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    health!: number;
  
    @Expose({name: 'weight'})
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    weight!: number;
  
    @Expose({name: 'url'})
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url!: string;
  }
  