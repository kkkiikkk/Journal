interface Enemy {
    addEnemy(name: string): string

    addDamage(counter: number): number

    getAllEnemy(): string[]
}

class SmallEnemy implements Enemy {
    enemy: string[]
    damage: number[]

    public addEnemy(name: string): string {
        this.enemy.push(name)
        return name
    }

    public addDamage(counter: number): number {
        this.damage.push(counter)
        return counter
    }

    public getAllEnemy(): string[] {
        return this.enemy
    }
}

class BossEnemy implements Enemy {
    enemy: string[]
    damage: number[]

    public addEnemy(bossName: string): string {
        this.enemy.push(bossName)
        return bossName
    }

    public addDamage(counter: number): number {
        this.damage.push(counter)
        return counter
    }

    public getAllEnemy(): string[] {
        return this.enemy
    }
}

interface Park {
    FactoryMethod(): Enemy
}

class ParkEasyEnemy implements Park {

    public FactoryMethod() {
        return new SmallEnemy()
    }
}

class ParkHardEnemy implements Park {

    public FactoryMethod() {
        return new BossEnemy()
    }
}
