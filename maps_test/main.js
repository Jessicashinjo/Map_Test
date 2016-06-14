var game = new Phaser.Game(700, 325, Phaser.CANVAS, 'main')
var stateTestmap = {preload: preload, create: create,update: update, render: render};
game.state.add('stateTestmap', stateTestmap);
game.state.start('stateTestmap');



function preload() {
  game.load.tilemap('basic_map', 'blackwhite.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tileset', 'Gimp_tilesheet2.png');
  game.load.image('background', 'bg.png');
  // game.load.image('lock', 'lock_red.png');
  game.load.image('player', 'bird.png')

  // game.load.spritesheet('square', 'bird.png', 50, 50)
  // game.load.image('greenBackground', 'background_green.png');
}

var bg;
var p;
var jumpTimer = 0;
var cursors;
var jumpButton;
var ground;
var danger;

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // game.stage.backgroundColor = '#787878';
  background = game.add.tileSprite(0, 0, 700, 325, 'background');
  background.fixedToCamera = true;

  var map = game.add.tilemap('basic_map');
  map.addTilesetImage('Gimp_tilesheet2', 'tileset');
  // map.addTilesetImage('Items', 'lock');
  // map.addTilesetImage('greenBackground');

  // map.setCollisionBetween(14, 15);
  //
  // map.setCollisionBetween(15, 16);
  // map.setCollisionBetween(20, 25);
  // map.setCollisionBetween(27, 29);
  // map.setCollision(40);

  map.setCollisionBetween(1, 100000, true, 'DangerColl');
  map.setCollisionBetween(1, 100000, true, 'Ground');

  var foliage = map.createLayer('Foliage');
  ground = map.createLayer('Ground');
  danger = map.createLayer('DangerColl');

  // backgroundOL = map.createLayer('BackgroundOverlay');
  // p = game.add.sprite(100,100, 'p');
  // var points = map.createLayer('PointsColl');


  //  Un-comment this on to see the collision tiles
  // ground.debug = true;

  danger.resizeWorld();

  p = game.add.sprite(100, 20, 'player');

  game.physics.enable(p, Phaser.Physics.ARCADE);

  game.physics.arcade.gravity.y = 250;

  // p.body.bounce.y = 0.2;
  // p.body.linearDamping = 1;
  p.body.collideWorldBounds = true;

  game.camera.follow(p);

  cursors = game.input.keyboard.createCursorKeys();
  jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {

    game.physics.arcade.collide(p, ground);
    game.physics.arcade.collide(p, danger);

    p.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        p.body.velocity.x = -150;

    }
    else if (cursors.right.isDown)
    {
        p.body.velocity.x = 150;

    }

    if (jumpButton.isDown && p.body.onFloor() && game.time.now > jumpTimer)
    {
        p.body.velocity.y = -250;
        jumpTimer = game.time.now + 750;
    }

}

function render() {

    game.debug.body(p);
    game.debug.bodyInfo(p, 32, 320);

}
