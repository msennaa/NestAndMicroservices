import { Injectable, Logger } from '@nestjs/common';
import { createPlayerDto } from './dto/createPlayer.dto';
import { Player } from './interfaces/players.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);

  async createAndUpdatePlayers(createPlayerDto: createPlayerDto) {
    await this.create(createPlayerDto);
  }

  private create(createPlayerDto: createPlayerDto): void {
    const { name, email, phoneNumber } = createPlayerDto;

    const player: Player = {
      _id: uuidv4(),
      name,
      phoneNumber,
      email,
      ranking: 'A',
      rankingPosition: 2,
      photoUrl: 'www.google.com.br',
    };
    this.logger.log(`criaJogadorDto ${JSON.stringify(player)}`);
    this.players.push(player);
  }
}
