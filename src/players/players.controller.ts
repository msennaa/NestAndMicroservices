import { Body, Controller, Post } from '@nestjs/common';
import { createPlayerDto } from './dto/createPlayer.dto';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createAndUpdatePlayers(@Body() createPlayerDto: createPlayerDto) {
    await this.playersService.createAndUpdatePlayers(createPlayerDto);
  }
}
