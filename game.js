class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }
              preload() {
                this.load.image('background', 'assets/38386.jpg'); 
                this.load.image('title', 'assets/logo.png'); 
            }
            
            create() {
                let { width, height } = this.scale;
                
                let bg = this.add.image(width / 2, height / 2, 'background');
                let scaleX = width / bg.width;
                let scaleY = height / bg.height;
                let scale = Math.max(scaleX, scaleY);
                bg.setScale(scale).setScrollFactor(0);
                
                let title = this.add.image(width / 2, height * 0.3, 'title');
                title.setOrigin(0.5);
                title.setScale(Math.min(width / 5000, height / 3800));

                
                this.createButton(width / 2, height * 0.5, 'Main Sekarang', '#0f0', () => this.scene.start('AtmosphereTransition'));
                this.createButton(width / 2, height * 0.6, 'Opsi', '#ff0', () => alert('Opsi belum tersedia'));
                this.createButton(width / 2, height * 0.7, 'Kredit', '#f00', () => alert('Dibuat oleh Rysnanto'));
            }

    createButton(x, y, text, color, callback) {
        let button = this.add.rectangle(x, y, 200, 50, 0x444444, 1)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => button.setFillStyle(0x666666))
            .on('pointerout', () => button.setFillStyle(0x444444))
            .on('pointerdown', callback);
        
        this.add.text(x, y, text, { fontSize: '24px', fill: color })
            .setOrigin(0.5);
    }
}

class AtmosphereTransition extends Phaser.Scene {
    constructor() {
        super({ key: 'AtmosphereTransition' });
    }
    
    create() {
        let centerX = this.cameras.main.centerX;
        let centerY = this.cameras.main.centerY;
        
        let text = this.add.text(centerX, centerY, 'Menuju Atmosfer...', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5);

         let particles = this.add.particles('white');
         let emitter = particles.createEmitter({
             x: { min: 0, max: 800 },
             y: { min: 0, max: 400 },
             speed: 50,
             scale: { start: 0.1, end: 0 },
             lifespan: 2000,
             quantity: 5
         });

        this.cameras.main.fadeOut(2000, 0, 0, 0);
        this.time.delayedCall(2000, () => {
            this.scene.start('GameScene');
        });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('menubg', 'assets/bgmenu.jpg');
        this.load.image('sun', 'assets/sun.png');
        this.load.image('earth', 'assets/bumi.png');
        this.load.image('moon', 'assets/bulan.png');
        this.load.image('astronaut', 'assets/astrounut.png');
    }

    create() {
        this.add.rectangle(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight, 0x000000);
        
        this.sun = this.add.image(window.innerWidth * 0.75, window.innerHeight / 2, 'sun').setScale(0.8);
        this.earth = this.add.image(window.innerWidth * 0.25, window.innerHeight * 0.3, 'earth').setInteractive().setScale(0.2);
        this.moon = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'moon').setInteractive().setScale(0.1);
        
        this.astronaut = this.add.image(150, this.scale.height - 100, 'astronaut').setScale(0.3);
        this.textBox = this.add.text(200, this.scale.height - 200, '', { 
            fontSize: '18px', 
            fill: '#fff', 
            backgroundColor: '#000', 
            padding: { x: 10, y: 5 }, 
            wordWrap: { width: 300 }
        }).setAlpha(0);
        
        this.labels = {};
        this.addPlanetLabels();
        this.addConnectingLines();
        this.highlightActive = true;
        this.animateAstronaut();
    }
    addPlanetLabels() {
        this.labels.earth = this.add.text(this.earth.x, this.earth.y - 50, 'Bumi', { fontSize: '20px', fill: '#fff' , backgroundColor: '#000', padding: { x: 5, y: 5 }}).setOrigin(0.5);
        this.labels.moon = this.add.text(this.moon.x, this.moon.y - 50, 'Bulan', { fontSize: '20px', fill: '#fff' ,backgroundColor: '#000', padding: { x: 5, y: 5 }}).setOrigin(0.5);
        this.labels.sun = this.add.text(this.sun.x, this.sun.y - 50, 'Matahari', { fontSize: '20px', fill: '#fff',backgroundColor: '#000', padding: { x: 5, y: 5 } }).setOrigin(0.5);
    }

    addConnectingLines() {
        this.lines = this.add.graphics();
        this.updateLines();
    }

    updateLines() {
        this.lines.clear();
        this.lines.lineStyle(2, 0xffffff, 0.5);
        this.lines.strokeLineShape(new Phaser.Geom.Line(this.earth.x, this.earth.y, this.moon.x, this.moon.y));
        this.lines.strokeLineShape(new Phaser.Geom.Line(this.earth.x, this.earth.y, this.sun.x, this.sun.y));
    }

    updateLabels() {
        this.labels.earth.setPosition(this.earth.x, this.earth.y - 50);
        this.labels.moon.setPosition(this.moon.x, this.moon.y - 50);
        this.labels.sun.setPosition(this.sun.x, this.sun.y - 50);
    }
    animateAstronaut() {
        let descriptions = [
            { obj: this.astronaut, text: 'Haii saya ARIS , Disini aku akan memperkenalkan kamu dengan planet yang akan kita amati!' },
            { obj: this.astronaut, text: 'Namun disini kita akan mengamati terjadinya gerhana' },
            { obj: this.sun, text: 'Ini adalah Matahari, sumber cahaya utama kita.' },
            { obj: this.earth, text: 'Ini adalah Bumi, tempat kita tinggal.' },
            { obj: this.moon, text: 'Ini adalah Bulan, satelit alami Bumi.' },
            { obj: this.astronaut, text: 'Sekarang! ayo kita bermain mencari letak bagaimana gerhana bisa terjadi' },
        ];
        
        let index = 0;
        let highlightNext = () => {
            if (index < descriptions.length) {
                let current = descriptions[index];
                this.highlightObject(current.obj);
                this.showText(current.text, () => {
                    index++;
                    this.time.delayedCall(2000, highlightNext);
                });
            } else {
                this.tweens.add({
                    targets: [this.astronaut, this.textBox],
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        this.astronaut.destroy();
                        this.textBox.destroy();
                        this.highlightActive = false;
                        this.restoreObjects();
                        this.enableDragAndDrop();
                        this.checkEclipse();
                    }
                });
            }
        };
        highlightNext();
    }

    highlightObject(obj) {
        if (!this.highlightActive) return;
        [this.sun, this.earth, this.moon].forEach(body => body.setAlpha(0.3));
        obj.setAlpha(1);
    }

    restoreObjects() {
        [this.sun, this.earth, this.moon].forEach(body => body.setAlpha(1));
    }

    showText(text, callback) {
        this.textBox.setAlpha(1);
        this.textBox.setText('');
        let charIndex = 0;
        let typingEffect = this.time.addEvent({
            delay: 50,
            repeat: text.length - 1,
            callback: () => {
                this.textBox.text += text[charIndex];
                charIndex++;
                if (charIndex === text.length) {
                    typingEffect.remove();
                    callback();
                }
            }
        });
    }

    enableDragAndDrop() {
        this.input.setDraggable(this.earth);
        this.input.setDraggable(this.moon);

        this.input.on('dragstart', (pointer, gameObject) => {
            this.restoreObjects(); // Menghapus efek highlight
            gameObject.setAlpha(0.8);
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
            this.updateLabels();
            this.updateLines();
        });

        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.setAlpha(1);
            this.checkEclipse();
        });
    }

    checkEclipse() {
        let sunX = this.sun.x;
        let earthX = this.earth.x;
        let moonX = this.moon.x;
        let sunY = this.sun.y;
        let earthY = this.earth.y;
        let moonY = this.moon.y;
    
        let isSolarEclipse = (moonX > earthX && moonX < sunX && Math.abs(moonY - earthY) < 50);
        let isLunarEclipse = (earthX > moonX && earthX < sunX && Math.abs(moonY - earthY) < 50);
    
        if (isSolarEclipse) {
            this.showEclipseEffect('Gerhana Matahari terjadi!', this.moon);
        } else if (isLunarEclipse) {
            this.showEclipseEffect('Gerhana Bulan terjadi!', this.earth);
        } else {
            this.clearEclipseEffect();
        }
    }
    
    showEclipseEffect(message, eclipsedObject) {
        this.textBox.setText(message);
        this.textBox.setAlpha(1);
    
        [this.sun, this.earth, this.moon].forEach(obj => obj.setAlpha(0.3));
        eclipsedObject.setAlpha(1);
    }
    
    clearEclipseEffect() {
        this.textBox.setAlpha(0);
        [this.sun, this.earth, this.moon].forEach(obj => obj.setAlpha(1));
    }
}



const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [MainMenu, AtmosphereTransition, GameScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});