import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { createPlayerDto } from './dto/createPlayer.dto';
import { Player } from './interfaces/players.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);

  async createAndUpdatePlayers(createPlayerDto: createPlayerDto) {
    const { email } = createPlayerDto;

    const foundPlayer = await this.players.find(
      (player) => player.email === email,
    );

    if (foundPlayer) {
      await this.update(foundPlayer, createPlayerDto);
    } else {
      await this.create(createPlayerDto);
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.players;
  }

  async getByEmail(email: string): Promise<Player> {
    const foundPlayer = await this.players.find(
      (player) => player.email === email,
    );

    if (!foundPlayer) {
      throw new NotFoundException(`Player with email ${email} not found`);
    }

    return foundPlayer;
  }

  async deletePlayer(email: string): Promise<void> {
    const foundPlayer = await this.players.find(
      (player) => player.email === email,
    );

    if (!foundPlayer) {
      throw new NotFoundException(`Player with email ${email} not found`);
    }

    this.players = this.players.filter(
      (player) => player.email !== foundPlayer.email,
    );
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

  private update(foundPlayer: Player, createPlayerDto: createPlayerDto): void {
    const { name } = createPlayerDto;
    foundPlayer.name = name;
  }
}
