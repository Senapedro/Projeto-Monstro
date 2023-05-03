new Vue({
    el: '#app',
    data: {
        running: false,
        playerlife: 100,
        monsterLife: 100,
        logs: []
    },
    computed: {
        hasResult() {
            return this.playerlife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame() {
            this.running = true,
            this.playerlife = 100
            this.monsterLife = 100
            this.logs = []
        },
        attack(especial) {
            this.hurt('monsterLife', 5, 10, especial, 'jogador', 'monstro', 'player')
            if(this.monsterLife > 0) {
                this.hurt('playerlife', 6, 11, false, 'monstro', 'jogador', 'monster')
            }
        },
        hurt(prop,min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`,cls)
        },
        healAndHurt() {
            this.heal(10,15)
            this.hurt('playerlife', 7, 12, false, 'monstro', 'jogador', 'monster')
        },
        heal(min, max) {
            const heal = this.getRandom(min, max)
            this.playerlife = Math.min(this.playerlife + heal, 100)
            this.registerLog(`Jogador ganhou força de ${heal}.`, 'player')
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLog(text, cls) {
            this.logs.unshift({ text, cls })

        }
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false
        }
    }
   
})