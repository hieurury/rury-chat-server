import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { FriendService } from 'src/services/friend.service';

@Controller("/friend")
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get("ping")
  getPing(): object {
    return this.friendService.getPingService();
  }

  @Get()
  getAllFriendShips(): Promise<object> { 
    return this.friendService.getAllFriendShips();
  }

//   @Delete(":id")
//   deleteFriendById(@Param("id") friendId: string): Promise<object> {
//     return this.friendService.deleteFriendById(friendId);
//   }

//   @Post()
//   createFriend(@Body() friendData: { username: string, email: string, password: string }): Promise<object> {
//     return this.friendService.createFriend(friendData);
//   }
}
