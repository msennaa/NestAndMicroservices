import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { createPlayerDto } from './dto/createPlayer.dto';
import { Player } from './interfaces/players.interface';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async createAndUpdatePlayers(createPlayerDto: createPlayerDto) {
    const { email } = createPlayerDto;

    const foundPlayer = await this.playerModel.findOne({ email }).exec();

    if (foundPlayer) {
      await this.update(createPlayerDto);
    } else {
      await this.create(createPlayerDto);
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async getByEmail(email: string): Promise<Player> {
    const foundPlayer = await this.playerModel.findOne({ email }).exec();

    if (!foundPlayer) {
      throw new NotFoundException(`Player with email ${email} not found`);
    }

    return foundPlayer;
  }

  async deletePlayer(email: string): Promise<any> {
    return await this.playerModel.deleteOne({ email }).exec();
  }

  private async create(createPlayerDto: createPlayerDto): Promise<Player> {
    const createdPlayer = new this.playerModel(createPlayerDto);
    return await createdPlayer.save();
  }

  private async update(createPlayerDto: createPlayerDto): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate({ email: createPlayerDto }, { $set: createPlayerDto })
      .exec();
  }
}
