import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AddMemberToPartyCommand,
  DeletePartyCommand,
  RemoveMemberFromPartyCommand,
} from '../../core/application/commands';
import {
  GetPartyByIdQuery,
  GetPartyByUserQuery,
  GetPartyMembersWithStatsQuery,
} from '../../core/application/queries';
import { PlayerEntity, UserEntity } from '../../core/domain/entities';
import { AuthenticatedUser } from '../../core/infrastructure/decorators';
import { InvitePartyDto } from './dto/invite-party.dto';
import { RemoveMemberDto } from './dto/remove-member.dto';

@Controller('parties')
export class PartyController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @Post('invite')
  async inviteToParty(
    @Body() body: InvitePartyDto,
    @AuthenticatedUser() user: UserEntity,
  ) {
    const command = new AddMemberToPartyCommand(
      body.partyId ?? '',
      body.playerId,
      user,
    );
    return await this._commandBus.execute<AddMemberToPartyCommand, void>(
      command,
    );
  }

  @Post('remove-member')
  async removeMember(
    @Body() body: RemoveMemberDto,
    @AuthenticatedUser() user: UserEntity,
  ) {
    const command = new RemoveMemberFromPartyCommand(
      body.partyId,
      body.playerId,
      user,
    );
    return await this._commandBus.execute<RemoveMemberFromPartyCommand, void>(
      command,
    );
  }

  @Delete(':partyId')
  async deleteParty(
    @Param('partyId') partyId: string,
    @AuthenticatedUser() user: UserEntity,
  ) {
    const command = new DeletePartyCommand(partyId, user);

    return await this._commandBus.execute<DeletePartyCommand, void>(command);
  }

  @Get('me')
  async getPartyByUser(@AuthenticatedUser() user: UserEntity) {
    const query = new GetPartyByUserQuery(user);

    return await this._queryBus.execute<GetPartyByUserQuery, unknown>(query);
  }

  @Get(':partyId')
  async getPartyById(
    @Param('partyId') partyId: string,
    @AuthenticatedUser() user: UserEntity,
  ) {
    const query = new GetPartyByIdQuery(partyId, user);

    return await this._queryBus.execute<GetPartyByIdQuery, unknown>(query);
  }

  @Get('me/members')
  async getPartyMembers(@AuthenticatedUser() user: UserEntity) {
    const query = new GetPartyMembersWithStatsQuery(user);

    return await this._queryBus.execute<
      GetPartyMembersWithStatsQuery,
      PlayerEntity[]
    >(query);
  }
}
