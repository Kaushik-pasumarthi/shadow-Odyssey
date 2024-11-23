import pygame as pg
from sys import exit
from random import randint
def shit():
  global current_time
  current_time=int(pg.time.get_ticks()/1000)-start_time
  score_surf=test_font.render(f'{current_time}',False,'white')
  score_rect=score_surf.get_rect(center=(400,50))
  stuff.blit(score_surf,score_rect)

def obstacle_movement(obstacle_list):
  if obstacle_list:
    for obstacle_rect in obstacle_list:
      obstacle_rect.x-=5
      # stuff.blit(snail_surface,obstacle_rect)
      if obstacle_rect.bottom==300:stuff.blit(snail_surface,obstacle_rect)
      else:stuff.blit(fly_surf,obstacle_rect)
    obstacle_list=[obstacle for obstacle in obstacle_list if obstacle.x>-100]

    
    return obstacle_list
  else: return []

def collisions(player,obstacles):
  if obstacles:
    for obstacle_rect in obstacles:
      if player.colliderect(obstacle_rect):
        return False
  return True      

def player_animation():
  global player_surf,player_index
  if player_rect.bottom<300:
    player_surf=player_jump
  else:
    player_index+=0.1
    if player_index>=len(player_walk):player_index=0
    player_surf=player_walk[int(player_index)]


def spawn_falling_enemy():
  x_pos = randint(50, 750)
  return falling_enemy_surface.get_rect(midtop=(x_pos, 0))

def move_falling_enemies(enemy_list):
  if enemy_list:
    for enemy_rect in enemy_list:
      enemy_rect.y += 2  # Adjust falling speed here
    enemy_list = [enemy for enemy in enemy_list if enemy.top < 400]
  return enemy_list

def check_falling_enemy_collision(player, enemies):
  for enemy_rect in enemies:
    if player.colliderect(enemy_rect):
      return False  # Game over
  return True



pg.init()
stuff=pg.display.set_mode((800,400))
pg.display.set_caption("Shadow Odyssey")
clock=pg.time.Clock()
test_font=pg.font.Font('font/Pixeltype.ttf',50)
game_active=True
start_time=0
sky_surface=pg.image.load('graphics/Sky2.jpg').convert()
sky_surface = pg.transform.scale(sky_surface, (800, 300))
sky_x=0
ground_surface=pg.image.load('graphics/ground.png').convert()
ground_x=0
# score_surf=test_font.render('My game',False,(64,64,64))
# score_rect=score_surf.get_rect(center=(400,50))



capy_1=pg.image.load('graphics/capy1.png').convert_alpha()
capy_1= pg.transform.scale(capy_1, (50, 50))
# capy_2=pg.image.load('graphics/capy2.png').convert_alpha()
# capy_2= pg.transform.scale(capy_2, (50, 30))
capy_3=pg.image.load('graphics/capy3.png').convert_alpha()
capy_3= pg.transform.scale(capy_3, (50, 50))
capy_frames=[capy_1,capy_3]
capy_frame_index=0
snail_surface=capy_frames[capy_frame_index]




fly_1=pg.image.load('graphics/Fly1.png').convert_alpha()

fly_2=pg.image.load('graphics/Fly2.png').convert_alpha()

fly_frames=[fly_1,fly_2]
fly_frame_index=0
fly_surf=fly_frames[fly_frame_index]

falling_enemies = []
falling_enemy_surface = pg.image.load('graphics/grenade.png').convert_alpha()
falling_enemy_surface = pg.transform.scale(falling_enemy_surface, (30, 30))

obstacle_rect_list=[]

player_walk_1=pg.image.load('graphics/walk1.png').convert_alpha()
player_walk_1 = pg.transform.scale(player_walk_1, (60, 70))
player_walk_2=pg.image.load('graphics/walk2.png').convert_alpha()
player_walk_2 = pg.transform.scale(player_walk_2, (60, 70))
player_walk_3=pg.image.load('graphics/walk3.png').convert_alpha()
player_walk_3 = pg.transform.scale(player_walk_3, (60, 70))
player_walk_4=pg.image.load('graphics/walk4.png').convert_alpha()
player_walk_4= pg.transform.scale(player_walk_4, (60, 70))


player_walk=[player_walk_1,player_walk_2,player_walk_3,player_walk_4]
player_index=0
player_jump=pg.image.load('graphics/jump.png').convert_alpha()
player_jump= pg.transform.scale(player_jump, (60, 70))

player_surf=player_walk[player_index]

player_rect=player_surf.get_rect(midbottom=(80,300))
player_gravity=0
player_stand=pg.image.load('graphics/osaka.jpg').convert_alpha()
player_stand = pg.transform.scale(player_stand, (800, 400))
player_stand_rect=player_stand.get_rect(center=(400,200))
player_stand1=pg.image.load('graphics/player_walk2.png').convert_alpha()
player_stand1 = pg.transform.scale(player_stand1, (200, 175))
player_stand1_rect=player_stand1.get_rect(center=(400,200))
game_name=test_font.render('Shadow Odyssey',False,'black')
game_name_rect=game_name.get_rect(center=(400,110))







#timer
obstacle_timer=pg.USEREVENT +1
pg.time.set_timer(obstacle_timer,1500)

snail_animation_timer=pg.USEREVENT+2
pg.time.set_timer(snail_animation_timer,500)

fly_animation_timer=pg.USEREVENT+3
pg.time.set_timer(fly_animation_timer,200)


falling_enemy_timer = pg.USEREVENT + 3
pg.time.set_timer(falling_enemy_timer, 2200)

player_speed=5
bg_speed=2
is_small = False  # Flag to check if the player is small
shrink_start_time = 0  # To track when shrinking started
shrink_duration = 1000  # 1 second in milliseconds


while True:
  for event in pg.event.get():
    if event.type==pg.QUIT: 
      pg.quit()
      exit()
    if game_active:
      if event.type==pg.MOUSEBUTTONDOWN and player_rect.bottom>=300 :
        if player_rect.collidepoint(event.pos):
          player_gravity=-18


      if event.type==pg.KEYDOWN:
        if event.key==pg.K_UP and player_rect.bottom>=300:
          player_gravity=-18
      
      if event.type==obstacle_timer :
        if randint(0,2):
          obstacle_rect_list.append(snail_surface.get_rect(midbottom=(randint(900,1100),300)))
        else:
          obstacle_rect_list.append(fly_surf.get_rect(midbottom=(randint(900,1100),randint(210,280))))
      if event.type==snail_animation_timer:
        if capy_frame_index==0:capy_frame_index=1
        else:capy_frame_index=0
        snail_surface=capy_frames[capy_frame_index]

      if event.type==fly_animation_timer:
        if fly_frame_index==0:fly_frame_index=1
        else:fly_frame_index=0
        fly_surf=fly_frames[fly_frame_index]
      if event.type == falling_enemy_timer:
        falling_enemies.append(spawn_falling_enemy())



    else:
      if event.type==pg.KEYDOWN and event.key==pg.K_SPACE:
        game_active=True
        # snail_rect.left=800
        falling_enemies.clear()

        start_time=int(pg.time.get_ticks()/1000)
        obstacle_rect_list.clear()

      

    
  keys = pg.key.get_pressed()
  if keys[pg.K_LEFT]:
      player_rect.x -= player_speed
  if keys[pg.K_RIGHT]:
      player_rect.x += player_speed

  # Keep the player within screen bounds
  if player_rect.left < 0:
      player_rect.left = 0
  if player_rect.right > 800:
      player_rect.right = 800

  sky_x-=bg_speed
  ground_x-=bg_speed
  if sky_x <= -800:
    sky_x = 0
  if ground_x <= -800:
    ground_x = 0






  # if game_active:
  #   keys = pg.key.get_pressed()
  #   if keys[pg.K_DOWN] and not is_small:
  #     # Shrink the player and set the timer
  #     is_small = True
  #     shrink_start_time = pg.time.get_ticks()

  #     # Get current dimensions
  #     current_width = player_surf.get_width()
  #     current_height = player_surf.get_height()

  #     # Shrink dimensions
  #     new_width = current_width // 2
  #     new_height = current_height // 2

  #     # Update player_walk frames
  #     player_walk = [pg.transform.scale(frame, (frame.get_width() // 2, frame.get_height() // 2)) for frame in player_walk]

  #     # Update player_surf and repositionzz
  #     player_surf = pg.transform.scale(player_surf, (new_width, new_height))
  #     player_rect = player_surf.get_rect(midbottom=(player_rect.centerx, 300))  # Adjust bottom position to stay at 300

  #   # Reset size after timer
  #   if is_small and pg.time.get_ticks() - shrink_start_time > shrink_duration:
  #     is_small = False

  #     # Restore original dimensions
  #     original_width = player_surf.get_width() * 2
  #     original_height = player_surf.get_height() * 2

  #     # Update player_walk frames
  #     player_walk = [pg.transform.scale(frame, (frame.get_width() * 2, frame.get_height() * 2)) for frame in player_walk]

  #     # Update player_surf and reposition
  #     player_surf = pg.transform.scale(player_surf, (original_width, original_height))
  #     player_rect = player_surf.get_rect(midbottom=(player_rect.centerx, 300))  # Adjust bottom position to stay at 300



  if game_active:
    stuff.blit(sky_surface, (sky_x, 0))
    stuff.blit(sky_surface, (sky_x + 800, 0))
    stuff.blit(ground_surface, (ground_x, 300))
    stuff.blit(ground_surface, (ground_x + 800, 300))
    # pg.draw.rect(stuff,'#c0e8ec' ,score_rect)
    # pg.draw.rect(stuff,'#c0e8ec' ,score_rect,20)

    # stuff.blit(score_surf,score_rect)
    shit()
    # snail_rect.x-=4
    # if snail_rect.right<=0:
    #   snail_rect.left=800
    # stuff.blit(snail_surface,snail_rect)

    player_gravity+=1
    player_rect.y+=player_gravity
    if player_rect.bottom>=300:
      player_rect.bottom=300
    player_animation()
    stuff.blit(player_surf,player_rect)

    obstacle_rect_list=obstacle_movement(obstacle_rect_list)
    game_active=collisions(player_rect,obstacle_rect_list)

  if game_active:
    falling_enemies = move_falling_enemies(falling_enemies)
    for enemy_rect in falling_enemies:
      stuff.blit(falling_enemy_surface, enemy_rect)

      # Collision with falling enemies
      game_active = check_falling_enemy_collision(player_rect, falling_enemies)


    # if snail_rect.colliderect(player_rect):
    #   game_active=False
    # keys=pg.key.get_pressed()
    # keys[pg.K_UP]
  else:
    stuff.fill((94,129,162))
    # stuff.blit(player_stand,player_stand_rect)
    stuff.blit(player_stand1,player_stand1_rect)
    obstacle_rect_list.clear()
    player_rect.midbottom=(80,30)

    stuff.blit(game_name,game_name_rect)
    game_message = test_font.render(f'Press Space to play again!!', False, 'black')
    game_message_rect = game_message.get_rect(center=(410, 320))  # Adjust position for first line
    score_message = test_font.render(f'Your Scour: {current_time}', False, 'black')
    score_message_rect = score_message.get_rect(center=(400, 360))  # Position for the score
    stuff.blit(game_message, game_message_rect)
    stuff.blit(score_message, score_message_rect)

    
    
    


  pg.display.update()
  clock.tick(60)
  
  