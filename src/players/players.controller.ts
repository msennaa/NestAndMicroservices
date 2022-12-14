import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { createPlayerDto } from './dto/createPlayer.dto';
import { Player } from './interfaces/players.interface';
import { PlayersParametersValidator } from './pipes/players-parameters-validation';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createAndUpdatePlayers(@Body() createPlayerDto: createPlayerDto) {
    await this.playersService.createAndUpdatePlayers(createPlayerDto);
  }

  @Get()
  async getPlayers(@Query('email') email: string): Promise<Player[] | Player> {
    if (email) {
      return await this.playersService.getByEmail(email);
    } else {
      return await this.playersService.getAllPlayers();
    }
  }

  @Delete()
  async deletePlayer(
    @Query('email', PlayersParametersValidator) email: string,
  ): Promise<void> {
    this.playersService.deletePlayer(email);
  }
}
