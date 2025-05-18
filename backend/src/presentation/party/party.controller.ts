import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AddMemberToPartyCommand,
  CreatePartyCommand,
  DeletePartyCommand,
  RemoveMemberFromPartyCommand,
} from '../../core/application/commands';
import {
  GetPartyByIdQuery,
  GetPartyByUserQuery,
  GetPartyMembersQuery,
} from '../../core/application/queries';
import { UserEntity } from '../../core/domain/entities';
import { AuthenticatedUser } from '../../core/infrastructure/decorators';
import { CreatePartyDto } from './dto/create-party.dto';

@Controller('parties')
export class PartyController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @Post()
  async createParty(
    @Body() body: CreatePartyDto,
    @AuthenticatedUser() user: UserEntity,
  ) {
    const command = new CreatePartyCommand(body, user);

    return await this._commandBus.execute<CreatePartyCommand, void>(command);
  }

  @Post(':partyId/members/:playerId')
  async addMember(
    @Param('partyId') partyId: string,
    @Param('playerId') playerId: string,
    @AuthenticatedUser() user: UserEntity,
  ) {
    const command = new AddMemberToPartyCommand(partyId, playerId, user);

    return await this._commandBus.execute<AddMemberToPartyCommand, void>(
      command,
    );
  }

  @Delete(':partyId/members/:playerId')
  async removeMember(
    @Param('partyId') partyId: string,
    @Param('playerId') playerId: string,
    @AuthenticatedUser() user: UserEntity,
  ) {
    const command = new RemoveMemberFromPartyCommand(partyId, playerId, user);

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

  @Get(':partyId/members')
  async getPartyMembers(
    @Param('partyId') partyId: string,
    @AuthenticatedUser() user: UserEntity,
  ) {
    const query = new GetPartyMembersQuery(partyId, user);

    return await this._queryBus.execute<GetPartyMembersQuery, unknown>(query);
  }
}
