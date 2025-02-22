import { IsBoolean, IsNotEmpty, IsNumber, IsNumberString, IsOptional, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class DolarManualDto {
    @IsNotEmpty({message: 'El dolar es requerido'})
    @IsNumberString({}, {message: 'El dolar debe ser un numero'})
    precio: number;
}

export class UpdateDolarDto  {
    @IsBoolean()
    automatico: boolean;
  
    @IsOptional()
    @ValidateNested()
    @Type(() => DolarManualDto)
    dolarManual?: DolarManualDto;
}


