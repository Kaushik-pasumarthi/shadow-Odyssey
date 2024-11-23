# import pygame as pg
# from sys import exit
# from random import randint

# def shit():
#     global current_time
#     current_time = int(pg.time.get_ticks() / 1000) - start_time
#     score_surf = test_font.render(f'{current_time}', False, 'white')
#     score_rect = score_surf.get_rect(center=(400, 50))
#     stuff.blit(score_surf, score_rect)

# def obstacle_movement(obstacle_list):
#     if obstacle_list:
#         for obstacle_rect in obstacle_list:
#             obstacle_rect.x -= 5
#             if obstacle_rect.bottom == 300:
#                 stuff.blit(snail_surface, obstacle_rect)
#             else:
#                 stuff.blit(fly_surf, obstacle_rect)
#         obstacle_list = [obstacle for obstacle in obstacle_list if obstacle.x > -100]
#         return obstacle_list
#     else:
#         return []

# def collisions(player, obstacles):
#     if obstacles:
#         for obstacle_rect in obstacles:
#             if player.colliderect(obstacle_rect):
#                 return False
#     return True

# def player_animation():
#     global player_surf, player_index
#     if player_rect.bottom < 300:
#         player_surf = player_jump
#     else:
#         player_index += 0.1
#         if player_index >= len(player_walk):
#             player_index = 0
#         player_surf = player_walk[int(player_index)]

# def spawn_falling_enemy():
#     x_pos = randint(50, 750)
#     return falling_enemy_surface.get_rect(midtop=(x_pos, 0))

# def move_falling_enemies(enemy_list):
#     if enemy_list:
#         for enemy_rect in enemy_list:
#             enemy_rect.y += 5  # Adjust falling speed here
#         enemy_list = [enemy for enemy in enemy_list if enemy.top < 400]
#     return enemy_list

# def check_falling_enemy_collision(player, enemies):
#     for enemy_rect in enemies:
#         if player.colliderect(enemy_rect):
#             return False  # Game over
#     return True

# pg.init()
# stuff = pg.display.set_mode((800, 400))
# pg.display.set_caption("Shadow Odyssey")
# clock = pg.time.Clock()
# test_font = pg.font.Font('font/Pixeltype.ttf', 50)
# game_active = True
# start_time = 0

# sky_surface = pg.image.load('graphics/Sky2.jpg').convert()
# sky_surface = pg.transform.scale(sky_surface, (800, 300))
# sky_x = 0
# ground_surface = pg.image.load('graphics/ground.png').convert()
# ground_x = 0

# capy_1 = pg.image.load('graphics/capy1.png').convert_alpha()
# capy_1 = pg.transform.scale(capy_1, (50, 50))
# capy_3 = pg.image.load('graphics/capy3.png').convert_alpha()
# capy_3 = pg.transform.scale(capy_3, (50, 50))
# capy_frames = [capy_1, capy_3]
# capy_frame_index = 0
# snail_surface = capy_frames[capy_frame_index]

# fly_1 = pg.image.load('graphics/Fly1.png').convert_alpha()
# fly_2 = pg.image.load('graphics/Fly2.png').convert_alpha()
# fly_frames = [fly_1, fly_2]
# fly_frame_index = 0
# fly_surf = fly_frames[fly_frame_index]

# obstacle_rect_list = []

# player_walk_1 = pg.image.load('graphics/walk1.png').convert_alpha()
# player_walk_1 = pg.transform.scale(player_walk_1, (60, 80))
# player_walk_2 = pg.image.load('graphics/walk2.png').convert_alpha()
# player_walk_2 = pg.transform.scale(player_walk_2, (60, 80))
# player_walk_3 = pg.image.load('graphics/walk3.png').convert_alpha()
# player_walk_3 = pg.transform.scale(player_walk_3, (60, 80))
# player_walk_4 = pg.image.load('graphics/walk4.png').convert_alpha()
# player_walk_4 = pg.transform.scale(player_walk_4, (60, 80))

# player_walk = [player_walk_1, player_walk_2, player_walk_3, player_walk_4]
# player_index = 0
# player_jump = pg.image.load('graphics/jump.png').convert_alpha()
# player_jump = pg.transform.scale(player_jump, (60, 80))

# player_surf = player_walk[player_index]
# player_rect = player_surf.get_rect(midbottom=(80, 300))
# player_gravity = 0

# player_stand1 = pg.image.load('graphics/player_walk2.png').convert_alpha()
# player_stand1 = pg.transform.scale(player_stand1, (200, 175))
# player_stand1_rect = player_stand1.get_rect(center=(400, 200))
# game_name = test_font.render('Shadow Odyssey', False, 'black')
# game_name_rect = game_name.get_rect(center=(400, 110))

# # Falling enemy variables
# falling_enemies = []
# falling_enemy_surface = pg.image.load('graphics/snail1.png').convert_alpha()
# falling_enemy_surface = pg.transform.scale(falling_enemy_surface, (40, 40))

# # Timers
# obstacle_timer = pg.USEREVENT + 1
# pg.time.set_timer(obstacle_timer, 1500)

# snail_animation_timer = pg.USEREVENT + 2
# pg.time.set_timer(snail_animation_timer, 500)

# fly_animation_timer = pg.USEREVENT + 3
# pg.time.set_timer(fly_animation_timer, 200)

# falling_enemy_timer = pg.USEREVENT + 4
# pg.time.set_timer(falling_enemy_timer, 1200)

# while True:
#     for event in pg.event.get():
#         if event.type == pg.QUIT:
#             pg.quit()
#             exit()
#         if game_active:
#             if event.type == pg.MOUSEBUTTONDOWN and player_rect.bottom >= 300:
#                 if player_rect.collidepoint(event.pos):
#                     player_gravity = -20
#             if event.type == pg.KEYDOWN:
#                 if event.key == pg.K_UP and player_rect.bottom >= 300:
#                     player_gravity = -20
#             if event.type == obstacle_timer:
#                 if randint(0, 2):
#                     obstacle_rect_list.append(snail_surface.get_rect(midbottom=(randint(900, 1100), 300)))
#                 else:
#                     obstacle_rect_list.append(fly_surf.get_rect(midbottom=(randint(900, 1100), randint(210, 280))))
#             if event.type == snail_animation_timer:
#                 capy_frame_index = (capy_frame_index + 1) % len(capy_frames)
#                 snail_surface = capy_frames[capy_frame_index]
#             if event.type == fly_animation_timer:
#                 fly_frame_index = (fly_frame_index + 1) % len(fly_frames)
#                 fly_surf = fly_frames[fly_frame_index]
#             if event.type == falling_enemy_timer:
#                 falling_enemies.append(spawn_falling_enemy())
#         else:
#             if event.type == pg.KEYDOWN and event.key == pg.K_SPACE:
#                 game_active = True
#                 start_time = int(pg.time.get_ticks() / 1000)
#                 falling_enemies.clear()
#                 obstacle_rect_list.clear()

#     if game_active:
#         # Background
#         sky_x -= 2
#         ground_x -= 2
#         if sky_x <= -800:
#             sky_x = 0
#         if ground_x <= -800:
#             ground_x = 0
#         stuff.blit(sky_surface, (sky_x, 0))
#         stuff.blit(sky_surface, (sky_x + 800, 0))
#         stuff.blit(ground_surface, (ground_x, 300))
#         stuff.blit(ground_surface, (ground_x + 800, 300))

#         # Score
#         shit()

#         # Player
#         player_gravity += 1
#         player_rect.y += player_gravity
#         if player_rect.bottom >= 300:
#             player_rect.bottom = 300
#         player_animation()
#         stuff.blit(player_surf, player_rect)

#         # Obstacles
#         obstacle_rect_list = obstacle_movement(obstacle_rect_list)
#         game_active = collisions(player_rect, obstacle_rect_list)

#         # Falling enemies
#         falling_enemies = move_falling_enemies(falling_enemies)
#         for enemy_rect in falling_enemies:
#             stuff.blit(falling_enemy_surface, enemy_rect)

#         # Collision with falling enemies
#         game_active = check_falling_enemy_collision(player_rect, falling_enemies)

#     else:
#         stuff.fill((94, 129, 162))
#         stuff.blit(player_stand1, player_stand1_rect)
#         stuff.blit(game_name, game_name_rect)
#         game_message = test_font.render(f'Press Space to play again!!', False, 'black')
#         game_message_rect = game_message.get_rect(center=(410, 320))
#         score_message = test_font.render(f'Your Score: {current_time}', False, 'black')
#         score_message_rect = score_message.get_rect(center=(400, 360))
#         stuff.blit(game_message, game_message_rect)
#         stuff.blit(score_message, score_message_rect)

#     pg.display.update()
#     clock.tick(60)
